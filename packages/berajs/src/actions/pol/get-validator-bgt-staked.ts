import { bgtClient } from "@bera/graphql";
import {
  GetValidatorBgtStaked,
  GetValidatorBgtStakedQueryVariables,
  type GetValidatorBgtStakedQuery,
} from "@bera/graphql/pol";
import { Address } from "viem";

import { type BeraConfig } from "~/types";
import { formatDaysToTimestamps } from "~/utils";

export const getValidatorBgtStaked = async ({
  config,
  address,
  daysRange,
}: {
  config: BeraConfig;
  address: Address;
  daysRange: number;
}): Promise<GetValidatorBgtStakedQuery | undefined> => {
  try {
    if (!config.subgraphs?.polSubgraph) {
      throw new Error("pol subgraph uri is not found in config");
    }

    const result = await bgtClient.query<
      GetValidatorBgtStakedQuery,
      GetValidatorBgtStakedQueryVariables
    >({
      query: GetValidatorBgtStaked,
      variables: {
        address: address.toLowerCase(),
        timestamp: formatDaysToTimestamps(daysRange),
      },
    });

    return result.data;
  } catch (e) {
    console.error("getValidatorBgtStaked:", e);
    return undefined;
  }
};
