"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function CompanyChart() {
  const data = [
    { name: "Google", students: 45, packages: "₹18-22L" },
    { name: "Microsoft", students: 38, packages: "₹16-20L" },
    { name: "Amazon", students: 52, packages: "₹15-19L" },
    { name: "Infosys", students: 67, packages: "₹12-14L" },
    { name: "TCS", students: 89, packages: "₹10-12L" },
    { name: "Accenture", students: 76, packages: "₹11-13L" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Recruiting Companies</CardTitle>
        <CardDescription>Number of students placed in each company</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Bar dataKey="students" fill="var(--color-chart-1)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
