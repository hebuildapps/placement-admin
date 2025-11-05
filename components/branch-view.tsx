"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { branchData } from "@/lib/data"

export default function BranchView() {
  const totalSelections = branchData.reduce((sum, b) => sum + b.value, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Branch-wise Placement Contribution</h2>
        <p className="text-muted-foreground">Total selections by branch: {totalSelections}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placement Distribution by Branch</CardTitle>
          <CardDescription>Visual breakdown of placements across all branches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex justify-center items-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={branchData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {branchData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid var(--color-border)" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <p className="text-4xl font-bold text-foreground">{totalSelections}</p>
              <p className="text-sm text-muted-foreground">Selections</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Branch Details Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Details</CardTitle>
          <CardDescription>Detailed placement statistics by branch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {branchData.map((branch) => (
              <div
                key={branch.name}
                className="p-4 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: branch.fill }} />
                  <p className="font-semibold text-foreground">{branch.name}</p>
                </div>
                <p className="text-2xl font-bold text-primary">{branch.value}</p>
                <p className="text-xs text-muted-foreground">Students Placed</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
