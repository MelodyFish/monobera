"use client";

import React from "react";
import Image from "next/image";
import { formatter } from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";

import ValidatorsTable from "./validators-table";

export default function Validators({
  activeGauges,
  bgtSupply,
}: {
  activeGauges: number;
  bgtSupply: number;
}) {
  const totalValidators: number = 0;
  const prices = undefined;
  const totalBribeValue = 0;

  const isDataLoading = true;
  const generalInfo = [
    {
      amount: "69",
      text: "Total Validators",
    },
    {
      amount: "$130.123",
      text: "Total Active Incentives",
    },
    {
      amount: "10%",
      text: "BGT Inflation",
    },
    {
      amount: "15",
      text: "Active gauges",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {generalInfo.map((info, index) => (
          <Card
            className="p-6 text-left bg-muted border-border h-[150px] "
            key={info.text + index}
          >
            <div className="text-xs font-medium leading-[14px] text-muted-foreground">
              {info.text}
            </div>
            <div className="text-2xl font-semibold leading-loose text-foreground mt-4">
              {info.amount}
            </div>
          </Card>
        ))}
      </div>
      <ValidatorsTable />
    </div>
  );
}
