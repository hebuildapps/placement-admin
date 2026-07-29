"use client";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { branchData as mockBranchData } from "@/lib/data";
import type { ParsedPlacementData } from "@/app/actions/parse-file";

interface BranchViewProps {
  data: ParsedPlacementData | null;
}

// Custom tooltip
function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border shadow-lg rounded-lg px-3 py-2 text-xs">
      <p className="font-semibold text-foreground">{payload[0]?.name}</p>
      <p className="text-muted-foreground mt-0.5">
        Students: <span className="font-semibold text-foreground">{payload[0]?.value}</span>
      </p>
    </div>
  );
}

const PALETTE = [
  "hsl(var(--primary))",
  "hsl(210 60% 55%)",
  "hsl(160 55% 45%)",
  "hsl(35 85% 55%)",
  "hsl(280 55% 55%)",
  "hsl(0 65% 55%)",
];

export default function BranchView({ data }: BranchViewProps) {
  const branchData = data?.branchData || mockBranchData;
  const totalSelections = branchData.reduce((sum, b) => sum + b.value, 0);

  return (
    <div className="space-y-5">
      {/* ── Donut chart card ──────────────────────────────────────── */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">
            Placement Distribution by Branch
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Visual breakdown of placements across all branches
          </p>
        </div>
        <div className="relative flex justify-center items-center">
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                data={branchData}
                cx="50%"
                cy="46%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={3}
                dataKey="value"
                label={false}
              >
                {branchData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill || PALETTE[index % PALETTE.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>

          {/* Centre overlay */}
          <div className="absolute flex flex-col items-center justify-center pointer-events-none" style={{ top: "46%", transform: "translateY(-50%)" }}>
            <p className="text-3xl font-bold text-foreground tabular-nums leading-none">
              {totalSelections}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Total</p>
          </div>
        </div>
      </div>

      {/* ── Branch detail grid ────────────────────────────────────── */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">Branch Details</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Detailed placement statistics by branch
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {branchData.map((branch, idx) => {
            const pct = totalSelections > 0
              ? ((branch.value / totalSelections) * 100).toFixed(1)
              : "0.0";
            const colour = branch.fill || PALETTE[idx % PALETTE.length];
            return (
              <div
                key={branch.name}
                className="p-4 border border-border/40 rounded-xl hover:bg-muted/30 cursor-pointer transition-all duration-150 group"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colour }}
                  />
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                    {branch.name}
                  </p>
                </div>
                <p className="text-2xl font-bold text-foreground tabular-nums leading-none">
                  {branch.value}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Students placed</p>
                  <span
                    className="text-xs font-semibold px-1.5 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${colour}20`,
                      color: colour,
                    }}
                  >
                    {pct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
