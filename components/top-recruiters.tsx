import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TopRecruiters() {
  const recruiters = [
    { name: "Google", offers: 45, avgPackage: "₹20 LPA" },
    { name: "Microsoft", offers: 38, avgPackage: "₹18 LPA" },
    { name: "Amazon", offers: 52, avgPackage: "₹17 LPA" },
    { name: "Meta", offers: 32, avgPackage: "₹19 LPA" },
    { name: "Apple", offers: 28, avgPackage: "₹21 LPA" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Recruiters</CardTitle>
        <CardDescription>Companies with highest number of offers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recruiters.map((recruiter, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">{recruiter.name}</p>
                <p className="text-xs text-muted-foreground">{recruiter.offers} offers</p>
              </div>
              <span className="font-semibold text-primary">{recruiter.avgPackage}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
