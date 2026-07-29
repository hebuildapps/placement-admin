"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/sidebar";
import OverallView from "@/components/overall-view";
import BranchView from "@/components/branch-view";
import CompanyView from "@/components/company-view";
import { useSessionStorage } from "@/hooks/use-session-storage";
import type { ParsedPlacementData } from "@/app/actions/parse-file";

// Phosphor panel toggle icons
function IconSidebarSimple({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H80V200H40ZM216,200H96V56H216Z" />
    </svg>
  );
}

const TAB_LABELS: Record<string, { title: string; subtitle: string }> = {
  overall: {
    title: "Overview",
    subtitle: "Placement KPIs, top recruiters, and salary distribution",
  },
  branch: {
    title: "Branch Analytics",
    subtitle: "Branch-wise placement contribution and distribution",
  },
  company: {
    title: "Company Insights",
    subtitle: "Company-wise placement details and branch breakdown",
  },
};

export default function PlacementStats() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overall");
  const [collapsed, setCollapsed] = useState(false);

  const [placementData, setPlacementData, isDataLoaded] =
    useSessionStorage<ParsedPlacementData | null>("placementData", null);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["overall", "branch", "company"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.history.replaceState({}, "", `?tab=${tab}`);
  };

  const currentMeta = TAB_LABELS[activeTab] ?? TAB_LABELS.overall;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* ── Left Sidebar ─────────────────────────────────────────── */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onDataUpload={setPlacementData}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />

      {/* ── Main area ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Inner scrollable content with padding */}
        <div className="flex-1 overflow-y-auto p-3.5 pl-0 md:p-3.5 md:pl-0">
          {/* Rounded main content shell */}
          <div className="min-h-full rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col">

            {/* ── Page header bar ─────────────────────────────────── */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-border/40">
              {/* Collapse toggle */}
              <button
                onClick={() => setCollapsed((v) => !v)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150 cursor-pointer flex-shrink-0"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <IconSidebarSimple className="w-4 h-4" />
              </button>

              {/* Breadcrumb / page title */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs text-muted-foreground">PlacementLog</span>
                <span className="text-xs text-muted-foreground/50">/</span>
                <span className="text-xs font-medium text-foreground truncate">
                  {currentMeta.title}
                </span>
              </div>
            </div>

            {/* ── Content area ──────────────────────────────────── */}
            <div className="flex-1 px-6 py-6">
              {/* Section heading */}
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-foreground tracking-tight">
                  {currentMeta.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {currentMeta.subtitle}
                </p>
              </div>

              {/* Tab content */}
              <div className="transition-opacity duration-200">
                {activeTab === "overall" && isDataLoaded && (
                  <OverallView data={placementData} />
                )}
                {activeTab === "branch" && isDataLoaded && (
                  <BranchView data={placementData} />
                )}
                {activeTab === "company" && isDataLoaded && (
                  <CompanyView data={placementData} />
                )}
              </div>
            </div>

            {/* ── Footer ─────────────────────────────────────────── */}
            <div className="px-6 py-3 border-t border-border/30 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                PlacementLog — Admin Dashboard
              </p>
              <a
                href="https://github.com/hebuildapps/placement-admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors no-underline"
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
