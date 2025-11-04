// Hardcoded mock data for Placement Stats Dashboard
// TODO: Replace with parsed Excel data via xlsx lib

export interface KPI {
  title: string
  value: number | string
  delta: string
  trend: "up" | "down"
}

export interface CompanyData {
  name: string
  students: number
  fill: string
}

export interface SalaryData {
  name: string
  value: number
  fill: string
}

export interface BranchData {
  name: string
  value: number
  fill: string
}

export interface CompanyWiseData {
  company: string
  total: number
  branches: { [key: string]: number }
}

// KPI Stats - Overall View
export const kpiData: KPI[] = [
  { title: "Total Students", value: 892, delta: "+5.2%", trend: "up" },
  { title: "Placement Rate", value: "94%", delta: "+2.1%", trend: "up" },
  { title: "Avg Package", value: "₹12.5 LPA", delta: "+8.3%", trend: "up" },
  { title: "Highest Package", value: "₹45 LPA", delta: "+12%", trend: "up" },
]

// Company-wise placement data
export const companyData: CompanyData[] = [
  { name: "Google", students: 40, fill: "#000" },
  { name: "Microsoft", students: 38, fill: "#000" },
  { name: "Amazon", students: 52, fill: "#000" },
  { name: "Infosys", students: 67, fill: "#000" },
  { name: "TCS", students: 89, fill: "#000" },
  { name: "Accenture", students: 76, fill: "#000" },
]

// Salary distribution (grayscale)
export const salaryData: SalaryData[] = [
  { name: "8-10 LPA", value: 234, fill: "#E2E8F0" },
  { name: "10-12 LPA", value: 189, fill: "#CBD5E1" },
  { name: "12-15 LPA", value: 156, fill: "#94A3B8" },
  { name: "15-20 LPA", value: 201, fill: "#64748B" },
  { name: "20+ LPA", value: 112, fill: "#334155" },
]

// Branch-wise placement (colorful)
export const branchData: BranchData[] = [
  { name: "BBS", value: 16, fill: "#8B5CF6" },
  { name: "CSE", value: 245, fill: "#3B82F6" },
  { name: "ECE", value: 189, fill: "#06B6D4" },
  { name: "EEE", value: 156, fill: "#10B981" },
  { name: "MECH", value: 134, fill: "#F59E0B" },
  { name: "CIVIL", value: 78, fill: "#EF4444" },
]

// Top recruiters by branch
export const topRecruitersByBranch = [
  { company: "Google", students: 40, avgPackage: "₹20 LPA" },
  { company: "Microsoft", students: 38, avgPackage: "₹18 LPA" },
  { company: "Amazon", students: 52, avgPackage: "₹17 LPA" },
  { company: "Apple", students: 28, avgPackage: "₹21 LPA" },
]

// Company-wise detailed breakdown
export const companyWiseData: CompanyWiseData[] = [
  { company: "Google", total: 40, branches: { CSE: 35, ECE: 5, EEE: 0, MECH: 0, CIVIL: 0 } },
  { company: "Microsoft", total: 38, branches: { CSE: 30, ECE: 8, EEE: 0, MECH: 0, CIVIL: 0 } },
  { company: "Amazon", total: 52, branches: { CSE: 45, ECE: 7, EEE: 0, MECH: 0, CIVIL: 0 } },
  { company: "Infosys", total: 67, branches: { CSE: 40, ECE: 15, EEE: 8, MECH: 4, CIVIL: 0 } },
  { company: "TCS", total: 89, branches: { CSE: 45, ECE: 20, EEE: 15, MECH: 9, CIVIL: 0 } },
  { company: "Accenture", total: 76, branches: { CSE: 38, ECE: 18, EEE: 12, MECH: 8, CIVIL: 0 } },
]
