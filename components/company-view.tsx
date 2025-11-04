"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { companyWiseData, companyData } from "@/lib/data";

export default function CompanyView() {
  // Transform data for company-wise view (by branch breakdown)
  const branchColors: { [key: string]: string } = {
    CSE: "#3B82F6",
    ECE: "#06B6D4",
    EEE: "#10B981",
    MECH: "#F59E0B",
    CIVIL: "#EF4444",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Company-wise Placement Details
        </h2>
        <p className="text-muted-foreground">
          Detailed breakdown of placements by company and branch
        </p>
      </div>

      {/* Overall Company Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Total Placements by Company</CardTitle>
          <CardDescription>
            Number of students placed in each company
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid var(--color-border)",
                }}
              />
              <Bar dataKey="students" fill="#000" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Company Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {companyWiseData.map((company) => (
          <Card key={company.company}>
            <CardHeader>
              <CardTitle>{company.company}</CardTitle>
              <CardDescription>
                Total: {company.total} students placed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(company.branches).map(
                  ([branch, count]) =>
                    count > 0 && (
                      <div key={branch}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">
                            {branch}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {count}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="rounded-full h-2"
                            style={{
                              width: `${(count / company.total) * 100}%`,
                              backgroundColor:
                                branchColors[branch] || "#9CA3AF",
                            }}
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
