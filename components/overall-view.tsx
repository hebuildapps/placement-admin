"use client"

import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "recharts"
import { kpiData, companyData, salaryData, topRecruitersByBranch, branchData } from "@/lib/data"

export default function OverallView() {
  return (
    <>
      {/* KPI Cards - 4 column grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpiData.map((kpi, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
                  <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
                </div>
                {kpi.trend === "up" && <TrendingUp className="w-5 h-5 text-green-600" />}
              </div>
              <p className="text-xs text-green-600 font-medium mt-2">{kpi.delta} from last year</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid - Black bars for companies, grayscale pie for salary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Company Placements - Black bars */}
        <Card>
          <CardHeader>
            <CardTitle>Top Recruiting Companies</CardTitle>
            <CardDescription>Number of students placed</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={companyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
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

        {/* Salary Distribution - Grayscale pie */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
            <CardDescription>Package ranges across students</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salaryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid var(--color-border)" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Branch and Recruiters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch-wise placement */}
        <Card>
          <CardHeader>
            <CardTitle>Placement by Branch</CardTitle>
            <CardDescription>Students placed across branches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branchData.map((branch) => (
                <div key={branch.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{branch.name}</span>
                    <span className="text-sm text-muted-foreground">{branch.value} students</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="rounded-full h-2"
                      style={{
                        width: `${(branch.value / 250) * 100}%`,
                        backgroundColor: branch.fill,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Recruiters */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Recruiters</CardTitle>
            <CardDescription>Companies with highest offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topRecruitersByBranch.map((recruiter, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{recruiter.company}</p>
                    <p className="text-xs text-muted-foreground">{recruiter.students} offers</p>
                  </div>
                  <span className="font-semibold text-primary">{recruiter.avgPackage}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
