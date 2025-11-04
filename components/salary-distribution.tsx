"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

export default function SalaryDistribution() {
  const data = [
    { name: "8-10 LPA", value: 234, fill: "var(--color-chart-1)" },
    { name: "10-12 LPA", value: 189, fill: "var(--color-chart-2)" },
    { name: "12-15 LPA", value: 156, fill: "var(--color-chart-3)" },
    { name: "15-20 LPA", value: 201, fill: "var(--color-chart-4)" },
    { name: "20+ LPA", value: 112, fill: "var(--color-chart-5)" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary Distribution</CardTitle>
        <CardDescription>Package ranges across all students</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
