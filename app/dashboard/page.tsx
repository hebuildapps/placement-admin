"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import OverallView from "@/components/overall-view"
import BranchView from "@/components/branch-view"
import CompanyView from "@/components/company-view"
import Footer from "@/components/footer"
import { useSessionStorage } from "@/hooks/use-session-storage"
import type { ParsedPlacementData } from "@/app/actions/parse-file"

export default function PlacementStats() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("overall")

  const [placementData, setPlacementData, isDataLoaded] = useSessionStorage<ParsedPlacementData | null>(
    "placementData",
    null,
  )

  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam && ["overall", "branch", "company"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    const newUrl = `?tab=${tab}`
    window.history.replaceState({}, "", newUrl)
  }

  const handleDataUpload = (data: ParsedPlacementData) => {
    setPlacementData(data)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab={activeTab} onTabChange={handleTabChange} onDataUpload={handleDataUpload} />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Placement Statistics</h1>
            <p className="text-muted-foreground">
              {activeTab === "overall" && "Overall placement data and KPIs"}
              {activeTab === "branch" && "Branch-wise placement contribution"}
              {activeTab === "company" && "Company-wise placement details"}
            </p>
          </div>

          {/* Conditional view rendering with data passed */}
          <div className="transition-opacity duration-300">
            {activeTab === "overall" && isDataLoaded && <OverallView data={placementData} />}
            {activeTab === "branch" && isDataLoaded && <BranchView data={placementData} />}
            {activeTab === "company" && isDataLoaded && <CompanyView data={placementData} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
