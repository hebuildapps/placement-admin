"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlacementByBranch() {
  const data = [
    { branch: "CSE", placed: 245, total: 250, percentage: 98 },
    { branch: "ECE", placed: 189, total: 200, percentage: 94.5 },
    { branch: "EEE", placed: 156, total: 165, percentage: 94.5 },
    { branch: "MECH", placed: 134, total: 150, percentage: 89.3 },
    { branch: "CIVIL", placed: 78, total: 90, percentage: 86.7 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Placement by Branch</CardTitle>
        <CardDescription>Placement statistics across different branches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.branch}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{item.branch}</span>
                <span className="text-sm text-muted-foreground">
                  {item.placed}/{item.total} ({item.percentage}%)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
