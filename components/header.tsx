"use client"

import { useState } from "react"
import { TabButton } from "@/components/TabButton"
import UploadModal from "@/components/upload-modal"
import { LogIn, LogOut, Shield, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar"
import type { ParsedPlacementData } from "@/app/actions/parse-file"

interface HeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onDataUpload?: (data: ParsedPlacementData) => void
}

export default function Header({ activeTab, onTabChange, onDataUpload }: HeaderProps) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const handleUploadSuccess = (data: ParsedPlacementData) => {
    onDataUpload?.(data)
  }

  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold">📋</span>
            </div>
            <span className="text-xl font-bold text-foreground">PlacementLog</span>
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

            <Button variant="ghost" size="sm" className="gap-2">
              <LogIn className="w-4 h-4" />
              Login
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
  )
}
