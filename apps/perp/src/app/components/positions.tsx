"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import clsx from "clsx";
import { useInView } from "framer-motion";

import { formatBigIntUsd } from "~/utils/formatBigIntUsd";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { type IMarket } from "../berpetuals/page";

interface PositionProps extends IMarket {
  className?: string;
}

function Position({
  imageUri,
  pair_index = "0",
  name,
  open_interest,
  className,
  ...props
}: PositionProps) {
  const animationDelay = useMemo(() => {
    const possibleAnimationDelays = [
      "0s",
      "0.1s",
      "0.2s",
      "0.3s",
      "0.4s",
      "0.5s",
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(pair_index ?? 0));
  return (
    <figure
      className={clsx(
        "flex h-fit w-[162px] flex-shrink-0 items-center rounded-2xl border border-border bg-background p-4",
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-foreground">
        <div className="flex items-center gap-1">
          <Image
            src={imageUri ?? ""}
            alt={"selectedMarket"}
            width={24}
            height={24}
            className="rounded-full"
          />{" "}
          <span className="text-sm font-medium text-muted-foreground">
            {name}
          </span>
          <div className="text-sm font-medium leading-normal text-muted-foreground">
            {/* {assets} */}
          </div>
        </div>
        <div className="text-lg font-semibold leading-normal text-popover-foreground">
          {price && formatBigIntUsd(price, 10)}
        </div>

        <div className="mt-2 text-sm font-semibold leading-7 text-popover-foreground">
          {open_interest && formatBigIntUsd(open_interest?.oi_long, 18)}
        </div>
        <div className="text-xs font-normal leading-3 text-muted-foreground">
          Open Interest (L) (24H)
        </div>
        <div className="mt-2 text-sm font-semibold leading-7 text-popover-foreground">
          {open_interest && formatBigIntUsd(open_interest?.oi_short, 18)}
        </div>
        <div className="text-xs font-normal leading-3 text-muted-foreground">
          Open Interest (S) (24H)
        </div>
      </blockquote>
    </figure>
  );
}

function splitArray<T>(array: T[], numParts: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    } // @ts-expect-error - No types
    result[index].push(array[i]);
  }
  return result;
}

interface PositionRowProps {
  className?: string;
  row: number;
  positions: IMarket[];
  positionClassName?: (index: number) => string;
  msPerPixel?: number;
}

function PositionRow({
  className,
  row,
  positions,
  positionClassName,
  msPerPixel = 0,
}: PositionRowProps) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [rowWidth, setRowWidth] = useState(0);
  const duration = `${rowWidth * 4 * msPerPixel}ms`;

  useEffect(() => {
    if (!rowRef.current) return;
    const resizeObserver = new window.ResizeObserver(() => {
      setRowWidth(rowRef.current?.offsetWidth || 0);
    });

    resizeObserver.observe(rowRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className={clsx("flex animate-marquee-x space-x-4", className)}
      style={{
        // @ts-expect-error - No types
        "--marquee-duration": duration,
      }}
    >
      {positions.concat(positions).map((position, positionIndex) => (
        <Position
          key={positionIndex + row}
          aria-hidden={positionIndex >= positions.length}
          className={
            positionClassName &&
            positionClassName(positionIndex % positions.length)
          }
          {...position}
        />
      ))}
    </div>
  );
}

function PositionGrid({ markets }: { markets: IMarket[] }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const rows = splitArray(markets, 2);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-4 overflow-hidden "
    >
      {isInView && (
        <>
          <PositionRow
            row={0}
            // @ts-ignore
            positions={[...rows[0], ...rows[1]]}
            positionClassName={(positionIndex) =>
              clsx(
                // @ts-ignore
                positionIndex >= rows[0].length && "md:hidden",

                // @ts-ignore
                positionIndex >= rows[0].length && "lg:hidden",
              )
            }
            msPerPixel={10}
          />

          <PositionRow
            row={1}
            positions={[...rows[1], ...rows[0]]}
            // @ts-ignore
            positionClassName={(positionIndex) =>
              // @ts-ignore
              positionIndex >= rows[1].length && "lg:hidden"
            }
            msPerPixel={15}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-[120px] bg-gradient-to-l from-background" />
      <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-[120px] bg-gradient-to-r from-background" />
    </div>
  );
}

export default function Positions({
  showBtn = false,
  markets,
}: {
  showBtn?: boolean;
  markets: IMarket[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="md:leading-14 px-8 text-center text-3xl font-extrabold leading-9 tracking-tight text-foreground md:text-5xl">
        <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
          On-Chain <br />
          Perpetuals
        </span>{" "}
        Done Right!
      </h2>
      <div className="mb-4 px-8 text-center text-base font-medium leading-normal text-muted-foreground md:text-sm">
        Featuring a wide variety of high volume assets, with new tokens added on
        a regular basis.
      </div>

      <PositionGrid markets={markets} />
      {showBtn && (
        <Link className="mt-8 flex justify-center" href="/markets">
          <Button variant="secondary">View All Markets</Button>
        </Link>
      )}
    </section>
  );
}
