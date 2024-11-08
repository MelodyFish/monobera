"use client";

import React, { useState } from "react";
import { cn } from "@bera/ui";

interface SwapFeeInputProps {
  initialFee?: number;
  onFeeChange?: (fee: number) => void;
}

export function SwapFeeInput({
  initialFee = 0,
  onFeeChange,
}: SwapFeeInputProps) {
  const [fee, setFee] = useState<number>(initialFee);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const predefinedFees = [0.1, 0.2, 0.3];

  const handleFeeChange = (value: string) => {
    const parsedValue = parseFloat(value);
    setFee(parsedValue);

    // Validate the fee range and update the invalid state
    if (parsedValue >= 0.00001 && parsedValue <= 10) {
      setIsInvalid(false);
      onFeeChange?.(parsedValue); // Pass valid fee to parent, if callback provided
    } else {
      setIsInvalid(true);
    }
  };

  const handlePredefinedFeeClick = (value: number) => {
    setFee(value);
    setIsInvalid(false);
    onFeeChange?.(value);
  };

  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="number"
            value={fee}
            onChange={(e) => handleFeeChange(e.target.value)}
            placeholder="Enter swap fee"
            className={cn(
              "w-full rounded-md border p-2 pr-10 text-2xl",
              isInvalid
                ? "border-destructive-foreground text-destructive-foreground"
                : "border-border",
            )}
            aria-label="Swap Fee Input"
          />
          <span
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 transform text-lg text-gray-500",
              isInvalid && "text-destructive-foreground",
            )}
          >
            %
          </span>
        </div>

        <div className="flex gap-2">
          {predefinedFees.map((preset) => (
            <button
              type="button"
              key={preset}
              onClick={() => handlePredefinedFeeClick(preset)}
              className={cn(
                "rounded-md border px-4 py-2",
                fee === preset ? "border-info-foreground" : "border-border",
              )}
              aria-label="Swap Fee Input"
            >
              {preset}%
            </button>
          ))}
        </div>

        {isInvalid && (
          <div className="mt-2 rounded-md border border-destructive-foreground p-2 text-sm text-destructive-foreground">
            <i className="mr-2">⚠️</i>
            Invalid fee. Ensure the entered fee is between 0.00001% and 10%.
          </div>
        )}
      </div>
    </section>
  );
}