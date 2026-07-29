"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { companyWiseData as mockCompanyWiseData, companyData as mockCompanyData } from "@/lib/data";
import type { ParsedPlacementData } from "@/app/actions/parse-file";

interface CompanyViewProps {
  data: ParsedPlacementData | null;
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border shadow-lg rounded-lg px-3 py-2 text-xs">
      {label && <p className="font-semibold text-foreground mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-muted-foreground">
          {p.name}: <span className="font-semibold text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

const branchPalette: Record<string, string> = {
  CSE: "hsl(210 70% 55%)",
  ECE: "hsl(185 65% 45%)",
  EEE: "hsl(160 55% 42%)",
  MECH: "hsl(35 85% 52%)",
  CIVIL: "hsl(0 65% 55%)",
};

const BAR_FILL = "hsl(var(--primary))";

export default function CompanyView({ data }: CompanyViewProps) {
  const companyData = data?.companyData || mockCompanyData;
  const companyWiseData = data?.companyWiseData || mockCompanyWiseData;

  return (
    <div className="space-y-5">
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">
            Total Placements by Company
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Number of students placed in each company
          </p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={companyData} barSize={24}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="0"
              stroke="hsl(var(--border) / 0.4)"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: "hsl(var(--muted) / 0.5)" }}
            />
            <Bar dataKey="students" fill={BAR_FILL} radius={[4, 4, 0, 0]} name="Students" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {companyWiseData.map((company) => (
          <div
            key={company.company}
            className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-sm transition-shadow duration-200"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-semibold text-foreground leading-none">
                  {company.company}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {company.total} students placed
                </p>
              </div>
              <span className="text-xs font-semibold bg-muted text-foreground px-2 py-0.5 rounded-full tabular-nums">
                {company.total}
              </span>
            </div>

            <div className="space-y-3">
              {Object.entries(company.branches).map(
                ([branch, count]) =>
                  count > 0 && (
                    <div key={branch}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor:
                                branchPalette[branch] || "hsl(var(--primary))",
                            }}
                          />
                          <span className="text-xs font-medium text-foreground">
                            {branch}
                          </span>
                        </div>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {count}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{
                            width: `${(count / company.total) * 100}%`,
                            backgroundColor:
                              branchPalette[branch] || "hsl(var(--primary))",
                          }}
                        />
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
