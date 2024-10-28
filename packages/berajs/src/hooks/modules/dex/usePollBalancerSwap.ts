import {
  Address,
  Path,
  Slippage,
  Swap,
  SwapBuildOutputExactIn,
  SwapBuildOutputExactOut,
  SwapKind,
  Token,
  TokenAmount,
  ZERO_ADDRESS,
} from "@bera/berancer-sdk";
import { beraTokenAddress, chainId } from "@bera/config";
import useSWR from "swr";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { balancerApi, nativeToken } from "~/actions/dex/b-sdk";
import { useBeraJs } from "~/contexts";
import { SwapRequest, type DefaultHookOptions } from "~/types";

type IUsePollSwapsArgs = SwapRequest;
interface IUsePollSwapsOptions extends DefaultHookOptions {
  isTyping?: boolean | undefined;
}

// NOTE: isLoading and error are injected by SWR so we dont need to define them here
export interface SwapInfoV4 {
  swapKind: SwapKind;
  expectedAmountOut: TokenAmount;
  amountIn: TokenAmount;
  expectedAmountOutFormatted: string;
  amountInFormatted: string;
  buildCall: (
    slippagePercent: number,
    deadlineIn?: number, // defaults to 30 seconds
  ) => SwapBuildOutputExactIn | SwapBuildOutputExactOut;
  swapPaths: Path[];
}

// NOTE: this is used when generating typings
function getEmptyResponse(): SwapInfoV4 {
  return {
    swapPaths: [] as Path[],
    swapKind: SwapKind.GivenIn,
    expectedAmountOut: TokenAmount.fromHumanAmount(nativeToken, "0"),
    amountIn: TokenAmount.fromHumanAmount(nativeToken, "0"),
    expectedAmountOutFormatted: "0",
    amountInFormatted: "0",
    buildCall: (slippagePercent: number, deadlineIn?: number) =>
      ({
        swapAmount: BigInt(0),
        returnAmount: BigInt(0),
        amountIn: BigInt(0),
        amountOut: BigInt(0),
        swapKind: SwapKind.GivenIn,
        assets: [],
        encodedCallData: "0x",
        gasEstimate: BigInt(0),
        to: ZERO_ADDRESS,
        callData: "0x",
        value: BigInt(0),
        minAmountOut: TokenAmount.fromHumanAmount(nativeToken, "0"),
      }) as SwapBuildOutputExactIn,
  };
}

function convertZeroToWrapped(address: Address): Address {
  // NOTE: if we were using sdk v2's findRouteGivenIn it would handle this, but we are doing a raw fetchSorSwapPaths call
  return address.toLowerCase() === ZERO_ADDRESS ? beraTokenAddress : address;
}

const isZero = (amount: string) =>
  (!Number.isNaN(Number(amount)) && Number(amount) === 0) ||
  amount.trim() === "";

/**
 * Polls a pair for the optimal route and amount for a swap using Balancer SDK
 */
export const usePollBalancerSwap = (
  args: IUsePollSwapsArgs,
  options?: IUsePollSwapsOptions,
) => {
  const {
    tokenIn,
    tokenOut,
    amount,
    tokenInDecimals,
    tokenOutDecimals,
    isWrap, // NOTE: this will effectively mean we do not execute the query as wrapping is distinct from swapping.
  } = args;

  const publicClient = usePublicClient();
  const { account, config: beraConfig } = useBeraJs();
  const defaultDeadlineIn = 30; // seconds

  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY =
    !publicClient ||
    !account ||
    !config ||
    !tokenIn ||
    !tokenOut ||
    !tokenInDecimals ||
    !tokenOutDecimals ||
    isWrap || // NOTE: we dont do a query when we are doing wrapping, price is always 1:1 and its done differently.
    isZero(amount) || // TODO: it would be nice to strengthen the string formatting for inputs
    options?.isTyping
      ? null // Prevent fetching when required data is missing
      : [tokenIn, tokenOut, amount];

  return useSWR<SwapInfoV4>(
    QUERY_KEY,
    async () => {
      try {
        if (options?.isTyping) {
          return getEmptyResponse();
        }
        if (!publicClient || !account || !config) {
          throw new Error("Missing public client, account, or config");
        }
        const tokenInV3 = new Token(
          chainId,
          convertZeroToWrapped(tokenIn),
          tokenInDecimals ?? 18,
        );
        const tokenOutV3 = new Token(
          chainId,
          convertZeroToWrapped(tokenOut),
          tokenOutDecimals ?? 18,
        );
        const tokenAmount = TokenAmount.fromHumanAmount(
          tokenInV3,
          amount as `${number}`, // TODO: we should firm up the typing for amount, but it's actually a large-ish refactor
        );
        const swapKind = SwapKind.GivenIn;

        // Fetch paths using Balancer API
        // TODO: if the V3 SDK brings back swap.findRouteGivenIn we might want to use that interface instead
        const sorPaths = await balancerApi.sorSwapPaths.fetchSorSwapPaths({
          chainId,
          tokenIn: tokenInV3.address,
          tokenOut: tokenOutV3.address,
          swapKind,
          swapAmount: tokenAmount,
        });

        if (!sorPaths || sorPaths.length === 0) {
          throw new Error(
            `No swap paths returned from Balancer API between ${tokenInV3.address} and ${tokenOutV3.address}`,
          );
        }

        const swapInput = {
          chainId,
          paths: sorPaths,
          swapKind,
          userData: "0x" as `0x${string}`,
        };

        const swap = new Swap(swapInput);
        const queryOutput = await swap.query(publicClient.transport.url);

        if (queryOutput.swapKind !== SwapKind.GivenIn) {
          throw new Error("Swap kind is not GivenIn");
        }

        if (!queryOutput.expectedAmountOut) {
          throw new Error("No path amounts returned");
        }

        // NOTE: we are building this call here to set the deadline to 30 seconds from the time we return the object
        return {
          swapPaths: sorPaths,
          ...queryOutput,
          expectedAmountOutFormatted: formatUnits(
            queryOutput.expectedAmountOut.amount,
            tokenInDecimals,
          ),
          amountInFormatted: formatUnits(
            queryOutput.amountIn.amount,
            tokenInDecimals,
          ),
          buildCall: (
            slippagePercent: number,
            deadlineIn = defaultDeadlineIn,
          ) =>
            swap.buildCall({
              slippage: Slippage.fromPercentage(
                slippagePercent.toString() as `${number}`,
              ),
              deadline: BigInt(Math.round(Date.now() / 1000) + deadlineIn),
              queryOutput,
              sender: account,
              recipient: account,
              wethIsEth: true, // NOTE: this converts i/o wrapped addresses back to 0x0 for on-chain txs (see b-sdk.ts config)
            }),
        } satisfies SwapInfoV4;
      } catch (e: any) {
        // NOTE: we are throwing errors but logging them here because SWR doesnt handle errors well
        console.error(e);
        throw e;
      }
    },
    {
      ...options?.opts,
    },
  );
};
