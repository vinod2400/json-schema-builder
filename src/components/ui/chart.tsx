"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartConfig {
  label?: string;
  icon?: LucideIcon;
  color?: string;
}

const ChartContext = createContext<ChartConfig>({});

export function useChart() {
  return useContext(ChartContext);
}

export function ChartContainer({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  const [config] = useState<ChartConfig>({});

  return (
    <ChartContext.Provider value={config}>
      <div
        data-chart
        className={cn("flex flex-col gap-4", className)}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}

export function ChartTooltip({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-background p-2 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ChartTooltipContent({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function ChartLegend({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-recharts-legend
      className={cn("flex items-center gap-4", className)}
      {...props}
    />
  );
}
