"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  kpiData as mockKpiData,
  companyData as mockCompanyData,
  salaryData as mockSalaryData,
  topRecruitersByBranch as mockTopRecruiters,
  branchData as mockBranchData,
} from "@/lib/data";
import type { ParsedPlacementData } from "@/app/actions/parse-file";

function IconTrendUp({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M240,56v56a8,8,0,0,1-16,0V75.31l-82.34,82.35a8,8,0,0,1-11.32,0L96,123.31,29.66,189.66A8,8,0,0,1,18.34,178.34l72-72a8,8,0,0,1,11.32,0L136,140.69,212.69,64H168a8,8,0,0,1,0-16h56A8,8,0,0,1,240,56Z" />
    </svg>
  );
}

function IconUsers({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,16.28,114.86,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
    </svg>
  );
}

function IconBriefcase({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Z" />
    </svg>
  );
}

function IconCurrencyDollar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M152,120H136V72h16a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48H136V40a8,8,0,0,0-16,0V56H104a48,48,0,0,0,0,96h16v48H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-48,0a32,32,0,0,1,0-64h16v64Zm48,80H136V136h16a32,32,0,0,1,0,64Z" />
    </svg>
  );
}

function IconBuilding({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M240,208H224V96a16,16,0,0,0-16-16H160V48a16,16,0,0,0-16-16H48A16,16,0,0,0,32,48V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H160V96ZM48,48H144V208H112V168a8,8,0,0,0-8-8H72a8,8,0,0,0-8,8v40H48ZM96,208H80V176h16Z" />
    </svg>
  );
}

interface KpiCardProps {
  title: string;
  value: string | number;
  delta?: string;
  trend?: string;
  icon: React.ReactNode;
  accentClass: string;
}

function KpiCard({ title, value, delta, trend, icon, accentClass }: KpiCardProps) {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-border transition-all duration-200">
      <div className="flex items-start justify-between">
        <div
          className={`w-9 h-9 rounded-lg bg-[#fdfcfc] flex items-center justify-center ${accentClass}`}
        >
          {icon}
        </div>
        {trend === "up" && delta && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
            <IconTrendUp className="w-3 h-3" />
            {delta}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-semibold text-foreground tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
      </div>
    </div>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border shadow-lg rounded-lg px-3 py-2 text-xs">
      {label && <p className="font-medium text-foreground mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || "inherit" }} className="text-muted-foreground">
          {p.name}: <span className="font-semibold text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

const kpiAccents = [
  "bg-primary/10 text-primary",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
];

const kpiIcons = [
  <IconUsers className="w-4 h-4" />,
  <IconBriefcase className="w-4 h-4" />,
  <IconCurrencyDollar className="w-4 h-4" />,
  <IconBuilding className="w-4 h-4" />,
];

const BAR_FILL = "hsl(var(--primary))";

const PIE_PALETTE = [
  "hsl(var(--primary))",
  "hsl(210 60% 55%)",
  "hsl(160 55% 45%)",
  "hsl(35 85% 55%)",
  "hsl(280 55% 55%)",
  "hsl(0 65% 55%)",
];

interface OverallViewProps {
  data: ParsedPlacementData | null;
}

export default function OverallView({ data }: OverallViewProps) {
  const kpiData = data?.kpiData || mockKpiData;
  const companyData = data?.companyData || mockCompanyData;
  const salaryData = data?.salaryData || mockSalaryData;
  const topRecruitersByBranch = data?.topRecruitersByBranch || mockTopRecruiters;
  const branchData = data?.branchData || mockBranchData;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => (
          <KpiCard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            delta={kpi.delta}
            trend={kpi.trend}
            icon={kpiIcons[idx % kpiIcons.length]}
            accentClass={kpiAccents[idx % kpiAccents.length]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Top Recruiting Companies</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Students placed per company</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={companyData} barSize={24}>
              <CartesianGrid vertical={false} strokeDasharray="0" stroke="hsl(var(--border) / 0.4)" />
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
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.5)" }} />
              <Bar dataKey="students" fill={BAR_FILL} radius={[4, 4, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Salary Distribution</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Package ranges across students</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={salaryData}
                cx="50%"
                cy="48%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
              >
                {salaryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_PALETTE[index % PIE_PALETTE.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Placement by Branch</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Students placed across branches</p>
          </div>
          <div className="space-y-3.5">
            {branchData.map((branch, idx) => {
              const max = Math.max(...branchData.map((b) => b.value));
              const pct = max > 0 ? (branch.value / max) * 100 : 0;
              return (
                <div key={branch.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: branch.fill || PIE_PALETTE[idx % PIE_PALETTE.length] }}
                      />
                      <span className="text-sm font-medium text-foreground">{branch.name}</span>
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {branch.value} <span className="text-muted-foreground/60">students</span>
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: branch.fill || PIE_PALETTE[idx % PIE_PALETTE.length],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Top 5 Recruiters</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Companies with highest offers</p>
          </div>
          <div className="space-y-2">
            {topRecruitersByBranch.map((recruiter, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors duration-150 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs tabular-nums font-semibold text-muted-foreground w-4">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground leading-none">
                      {recruiter.company}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {recruiter.students} offers
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  {recruiter.avgPackage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
