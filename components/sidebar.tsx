"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import UploadModal from "@/components/upload-modal";
import { useTheme } from "@/components/theme-provider";
import type { ParsedPlacementData } from "@/app/actions/parse-file";

// ─── Phosphor icon SVG components ──────────────────────────────────────────
function IconSquaresFour({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM112,208H48V144h64Zm0-80H48V48h64Zm96,80H128V144h80Zm0-80H128V48h80Z" />
    </svg>
  );
}

function IconChartBar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160Zm-56,48h40V200H104Zm-48,48h32v56H56Z" />
    </svg>
  );
}

function IconChartPieSlice({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,96H136V56.36A88.15,88.15,0,0,1,216,120ZM120,56.36V128H48.36A88.09,88.09,0,0,1,120,56.36ZM128,216a88.09,88.09,0,0,1-79.64-88H120v79.64A88.06,88.06,0,0,1,128,216Zm8-8.36V136h71.64A88.15,88.15,0,0,1,136,207.64Z" />
    </svg>
  );
}

function IconBuildings({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M240,208H224V96a16,16,0,0,0-16-16H160V48a16,16,0,0,0-16-16H48A16,16,0,0,0,32,48V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H160V96ZM48,48H144V208H112V168a8,8,0,0,0-8-8H72a8,8,0,0,0-8,8v40H48ZM96,208H80V176h16Z" />
    </svg>
  );
}

function IconDownloadSimple({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z" />
    </svg>
  );
}

function IconExport({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66-42.34L136,85.31V176a8,8,0,0,0,16,0V85.31l13.66,16.35a8,8,0,0,0,12.68-9.72l-24-32a8,8,0,0,0-12.68,0l-24,32a8,8,0,1,0,12.68,9.72Z" />
    </svg>
  );
}

function IconSun({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
    </svg>
  );
}

function IconMoon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z" />
    </svg>
  );
}

function IconSignOut({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" />
    </svg>
  );
}

function IconCaretUpDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z" />
    </svg>
  );
}

function IconShield({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor">
      <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208Z" />
    </svg>
  );
}

// ─── Nav item type ──────────────────────────────────────────────────────────
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  tab: string;
}

const navItems: NavItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <IconSquaresFour />,
    tab: "overall",
  },
  {
    id: "branches",
    label: "Branches",
    icon: <IconChartPieSlice />,
    tab: "branch",
  },
  {
    id: "companies",
    label: "Companies",
    icon: <IconBuildings />,
    tab: "company",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <IconChartBar />,
    tab: "overall",
  },
];

// ─── Props ──────────────────────────────────────────────────────────────────
interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onDataUpload?: (data: ParsedPlacementData) => void;
  collapsed: boolean;
  onCollapsedChange: (val: boolean) => void;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  onDataUpload,
  collapsed,
  onCollapsedChange,
}: SidebarProps) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const handleExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const mod = await import("html2canvas");
      const html2canvas = (mod && (mod as any).default) || mod;
      const docEl = document.documentElement;
      const width = Math.max(docEl.scrollWidth, docEl.clientWidth);
      const height = Math.max(docEl.scrollHeight, docEl.clientHeight);
      const canvas = await html2canvas(document.documentElement, {
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        useCORS: true,
        scale: 1,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `placementlog-${new Date().toISOString().replace(/[:.]/g, "-")}.png`;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <aside
        className={`
          flex flex-col h-screen border-r border-r-transparent bg-background
          transition-all duration-300 ease-in-out flex-shrink-0
          hover:border-r-border
          ${collapsed ? "w-[64px]" : "w-[260px]"}
        `}
      >
        {/* ── Logo ──────────────────────────────────────────── */}
        <div
          className={`flex items-center gap-2.5 rounded-lg border border-card border-brightness-125 px-4 py-4 mb-1 ${collapsed ? "justify-center px-0" : ""}`}
        >
          <div className="w-7 h-7 rounded-lg bg-transparent flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-primary-foreground"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z" />
            </svg>
          </div>
          {!collapsed && (
            <span className="text-sm font-semibold text-foreground tracking-tight">
              PlacementLog
            </span>
          )}
        </div>

        {/* ── Nav group label ────────────────────────────────── */}
        {!collapsed && (
          <p className="text-[6px] font-semibold uppercase tracking-widest text-muted-foreground px-4 mb-1">
            Quick access
          </p>
        )}

        {/* ── Nav items ─────────────────────────────────────── */}
        <nav className="flex flex-col gap-0.5 px-2.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab && item.id !== "analytics";
            // analytics links to overall as secondary entry
            const effectiveActive =
              item.id === "analytics"
                ? false
                : activeTab === item.tab;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.tab)}
                title={collapsed ? item.label : undefined}
                className={`
                  flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
                  ${collapsed ? "justify-center px-0 py-2.5 w-full" : "px-3 py-2"}
                  ${
                    effectiveActive
                      ? "bg-card brightness-115 text-foreground"
                      : "text-foreground hover:bg-card/60 hover:text-foreground"
                  }
                `}
              >
                <span className="flex-shrink-0 text-[8px]">{item.icon}</span>
                {!collapsed && <span className="text-[8px]">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* ── Separator ─────────────────────────────────────── */}
        <div className="mx-3 my-3 border-t border-border/60" />

        {/* ── Bottom actions ────────────────────────────────── */}
        <div className={`flex flex-col gap-0.5 px-2.5 mt-auto pb-1`}>

          {/* Get Data */}
          <button
            onClick={() => setUploadModalOpen(true)}
            title={collapsed ? "Get Data" : undefined}
            className={`
              flex items-center gap-3 rounded-lg text-[8px] font-medium text-muted-foreground
              hover:bg-muted/60 hover:text-foreground transition-all duration-150 cursor-pointer
              ${collapsed ? "justify-center px-0 py-2.5 w-full" : "px-3 py-2"}
            `}
          >
            <IconDownloadSimple className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Get Data</span>}
          </button>

          {/* Export Results */}
          <button
            onClick={handleExport}
            disabled={exporting}
            title={collapsed ? "Export Results" : undefined}
            className={`
              flex items-center gap-3 rounded-lg text-[8px] font-medium text-muted-foreground
              hover:bg-muted/60 hover:text-foreground transition-all duration-150 cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
              ${collapsed ? "justify-center px-0 py-2.5 w-full" : "px-3 py-2"}
            `}
          >
            <IconExport className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{exporting ? "Exporting…" : "Export Results"}</span>}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={collapsed ? (theme === "dark" ? "Light Mode" : "Dark Mode") : undefined}
            className={`
              flex items-center gap-3 rounded-lg text-[8px] font-medium text-muted-foreground
              hover:bg-muted/60 hover:text-foreground transition-all duration-150 cursor-pointer
              ${collapsed ? "justify-center px-0 py-2.5 w-full" : "px-3 py-2"}
            `}
          >
            {theme === "dark" ? (
              <IconSun className="w-4 h-4 flex-shrink-0" />
            ) : (
              <IconMoon className="w-4 h-4 flex-shrink-0" />
            )}
            {!collapsed && (
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            )}
          </button>
        </div>

        {/* ── Separator ─────────────────────────────────────── */}
        <div className="mx-3 my-2 border-t border-border/60" />

        {/* ── Account selector ──────────────────────────────── */}
        <div className="relative px-2 pb-3" ref={dropdownRef}>
          <button
            onClick={() => setAccountOpen((v) => !v)}
            title={collapsed ? "Admin" : undefined}
            className={`
              w-full flex items-center gap-2.5 rounded-lg border border-border border-brightness-125 hover:bg-muted/60 transition-all duration-150 cursor-pointer
              ${collapsed ? "justify-center px-0 py-2" : "px-3 py-2"}
            `}
          >
            {/* Avatar */}
            
            {!collapsed && (
              <div className="hover:bg-card/60 p-1 rounded-lg">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <IconShield className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-semibold text-foreground leading-none truncate">
                    Admin
                  </p>
                  <p className="text-[10px] text-foreground mt-0.5 truncate">
                    admin@placementlog.dev
                  </p>
                </div>
                <IconCaretUpDown className="w-3.5 h-3.5 text-foreground flex-shrink-0" />
              </div>
            )}
          </button>

          {/* Dropdown */}
          {accountOpen && (
            <div
              className={`
                absolute bottom-full mb-1 z-50 bg-card border border-border shadow-lg rounded-xl overflow-hidden
                ${collapsed ? "left-full ml-2 w-40" : "left-2 right-2"}
              `}
            >
              <button
                onClick={() => {
                  setAccountOpen(false);
                  router.push("/");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors cursor-pointer"
              >
                <IconSignOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Upload modal (controlled here, re-used from existing component) */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={(data) => {
          onDataUpload?.(data);
          setUploadModalOpen(false);
        }}
      />
    </>
  );
}
