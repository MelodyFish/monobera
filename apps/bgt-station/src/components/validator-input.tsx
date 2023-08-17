import React from "react";
import { useRouter } from "next/navigation";
import { usePollBgtBalance } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { useFetchDelegatedValidatorAmount } from "~/hooks/useFetchDelegatedValidatorAmount";
import { DelegateEnum } from "../app/delegate/types";
import ValidatorSelector from "./validator-selector";

export default function ValidatorInput({
  action = DelegateEnum.DELEGATE,
  amount,
  onAmountChange,
  validatorAddress,
  redelegate,
  redelegateValidatorAddress,
  showDelegated, //when this is true, the validator list will only show the validators user delegated
}: {
  action: DelegateEnum;
  amount: string;
  onAmountChange: (amount: string) => void;
  validatorAddress?: string;
  redelegate?: boolean;
  redelegateValidatorAddress?: string;
  showDelegated?: boolean;
}) {
  const router = useRouter();
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();

  const { data: bgtDelegated } =
    useFetchDelegatedValidatorAmount(validatorAddress);
  return (
    <div className="relative">
      <Input
        type="number"
        className="h-[73px] p-4 text-right text-lg font-semibold leading-7"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        startAdornment={
          <ValidatorSelector
            validatorAddress={
              redelegate ? redelegateValidatorAddress : validatorAddress
            }
            onSelectValidator={(address) =>
              router.push(
                `/delegate?action=${action}&&validator=${
                  redelegate ? validatorAddress : address
                }${redelegate ? `&&redelegateValidator=${address}` : ""}`,
              )
            }
            showDelegated={showDelegated}
          />
        }
      />

      {action === DelegateEnum.DELEGATE && (
        <div className=" mt-2 flex h-3 w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
          <Icons.wallet className="relative inline-block h-3 w-3 " />
          {userBalance}
          <span
            className="underline hover:cursor-pointer"
            onClick={() => {
              onAmountChange(userBalance);
            }}
          >
            Fill Deposit
          </span>
        </div>
      )}

      {action !== DelegateEnum.DELEGATE &&
        !redelegate &&
        validatorAddress &&
        Boolean(bgtDelegated) && (
          <div className="absolute bottom-3 right-4 h-3 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <Avatar className="h-3 w-3">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="font-bold">
                  validator avatar
                </AvatarFallback>
              </Avatar>
              {bgtDelegated?.toString()}
              <span
                className="underline hover:cursor-pointer"
                onClick={() => {
                  if (bgtDelegated) onAmountChange(bgtDelegated.toString());
                }}
              >
                MAX
              </span>
            </div>
          </div>
        )}
    </div>
  );
}