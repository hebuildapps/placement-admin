"use client";

import { useState } from "react";
import { TabButton } from "@/components/TabButton";
import UploadModal from "@/components/upload-modal";
import { LogIn, LogOut, Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import type { ParsedPlacementData } from "@/app/actions/parse-file";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onDataUpload?: (data: ParsedPlacementData) => void;
}

export default function Header({
  activeTab,
  onTabChange,
  onDataUpload,
}: HeaderProps) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleUploadSuccess = (data: ParsedPlacementData) => {
    onDataUpload?.(data);
  };

  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold">📋</span>
            </div>
            <span className="text-xl font-bold text-foreground">Admin</span>
          </div>

          {/* Center: Tab Navigation */}
          <div className="flex items-center gap-3">
            <div className="flex space-x-0 bg-gray-100 rounded-lg overflow-hidden">
              <TabButton
                label="Overall Stats"
                isActive={activeTab === "overall"}
                onClick={() => onTabChange("overall")}
              />
              <TabButton
                label="Branch wise Stats"
                isActive={activeTab === "branch"}
                onClick={() => onTabChange("branch")}
              />
              <TabButton
                label="Company wise Stats"
                isActive={activeTab === "company"}
                onClick={() => onTabChange("company")}
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="default"
              size="sm"
              className="gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => setUploadModalOpen(true)}
            >
              <Download className="w-4 h-4" />
              Get Data
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={async () => {
                // dynamically import html2canvas only on demand
                if (exporting) return;
                setExporting(true);
                try {
                  const mod = await import("html2canvas");
                  const html2canvas = (mod && (mod as any).default) || mod;

                  const docEl = document.documentElement;
                  const width = Math.max(
                    docEl.scrollWidth,
                    docEl.clientWidth,
                    document.body ? document.body.scrollWidth : 0
                  );
                  const height = Math.max(
                    docEl.scrollHeight,
                    docEl.clientHeight,
                    document.body ? document.body.scrollHeight : 0
                  );

                  const canvas = await html2canvas(document.documentElement, {
                    width,
                    height,
                    windowWidth: width,
                    windowHeight: height,
                    useCORS: true,
                    scale: 1,
                  });

                  const dataUrl = canvas.toDataURL("image/png");
                  const link = document.createElement("a");
                  link.href = dataUrl;
                  link.download = `placementlog-fullpage-${new Date()
                    .toISOString()
                    .replace(/[:.]/g, "-")}.png`;
                  // trigger download
                  link.click();
                } catch (err) {
                  // keep simple: log to console; UI-level error handling could be added
                  // eslint-disable-next-line no-console
                  console.error("Export failed", err);
                } finally {
                  setExporting(false);
                }
              }}
              disabled={exporting}
            >
              <Download className="w-4 h-4" />
              {exporting ? "Exporting..." : "Export results"}
            </Button>

            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="gap-2">
                  <Shield className="w-4 h-4" />
                  Admin
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Check Profile</MenubarItem>
                  <MenubarItem className="gap-2">
                    <LogOut className="w-4 h-4" />
                    LogOut
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </header>

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  );
}
