export default function StatsOverview() {
  const stats = [
    { label: "Total Students", value: "892", change: "+5.2%" },
    { label: "Placement Rate", value: "94%", change: "+2.1%" },
    { label: "Avg Package", value: "₹12.5 LPA", change: "+8.3%" },
    { label: "Highest Package", value: "₹45 LPA", change: "+12%" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
          <h3 className="text-2xl font-bold text-foreground mb-2">{stat.value}</h3>
          <p className="text-xs text-green-600 font-medium">{stat.change} from last year</p>
        </div>
      ))}
    </div>
  )
}
