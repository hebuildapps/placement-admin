"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Briefcase, Building2, TrendingUp, Mail, Phone } from "lucide-react";

// Mock data types
interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  qualification?: string;
  experience?: number;
  phone?: string;
}

interface Company {
  id: string;
  name: string;
  industry: string;
  website?: string;
  location?: string;
  contactPerson?: string;
  contactEmail?: string;
  placements?: number;
}

interface Placement {
  id: string;
  studentName: string;
  studentId: string;
  companyName: string;
  packageAmount: string;
  position: string;
  placementDate: string;
  department: string;
}

// Mock data
const mockFaculty: Faculty[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@mitwpu.edu.in",
    department: "Computer Science",
    designation: "Professor",
    qualification: "Ph.D. in Computer Science",
    experience: 15,
    phone: "+91 9876543210",
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@mitwpu.edu.in",
    department: "Electronics",
    designation: "Associate Professor",
    qualification: "Ph.D. in Electronics",
    experience: 12,
    phone: "+91 9876543211",
  },
  {
    id: "3",
    name: "Dr. Amit Patel",
    email: "amit.patel@mitwpu.edu.in",
    department: "Mechanical",
    designation: "Professor",
    qualification: "Ph.D. in Mechanical Engineering",
    experience: 18,
    phone: "+91 9876543212",
  },
  {
    id: "4",
    name: "Dr. Sneha Desai",
    email: "sneha.desai@mitwpu.edu.in",
    department: "Management",
    designation: "Associate Professor",
    qualification: "Ph.D. in Business Administration",
    experience: 10,
    phone: "+91 9876543213",
  },
];

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Microsoft",
    industry: "Technology",
    website: "https://microsoft.com",
    location: "Bangalore, India",
    contactPerson: "John Doe",
    contactEmail: "john.doe@microsoft.com",
    placements: 25,
  },
  {
    id: "2",
    name: "Google",
    industry: "Technology",
    website: "https://google.com",
    location: "Hyderabad, India",
    contactPerson: "Jane Smith",
    contactEmail: "jane.smith@google.com",
    placements: 18,
  },
  {
    id: "3",
    name: "Amazon",
    industry: "E-commerce",
    website: "https://amazon.com",
    location: "Pune, India",
    contactPerson: "Robert Johnson",
    contactEmail: "robert.j@amazon.com",
    placements: 32,
  },
  {
    id: "4",
    name: "TCS",
    industry: "IT Services",
    website: "https://tcs.com",
    location: "Mumbai, India",
    contactPerson: "Sarah Williams",
    contactEmail: "sarah.w@tcs.com",
    placements: 45,
  },
];

const mockPlacements: Placement[] = [
  {
    id: "1",
    studentName: "Rahul Mehta",
    studentId: "CS2021001",
    companyName: "Microsoft",
    packageAmount: "2500000",
    position: "Software Engineer",
    placementDate: "2024-01-15",
    department: "Computer Science",
  },
  {
    id: "2",
    studentName: "Anjali Verma",
    studentId: "CS2021002",
    companyName: "Google",
    packageAmount: "2800000",
    position: "Software Developer",
    placementDate: "2024-02-20",
    department: "Computer Science",
  },
  {
    id: "3",
    studentName: "Vikram Singh",
    studentId: "ME2021005",
    companyName: "Amazon",
    packageAmount: "2200000",
    position: "Mechanical Engineer",
    placementDate: "2024-01-25",
    department: "Mechanical",
  },
  {
    id: "4",
    studentName: "Neha Patel",
    studentId: "EE2021003",
    companyName: "TCS",
    packageAmount: "1800000",
    position: "Electronics Engineer",
    placementDate: "2024-02-10",
    department: "Electronics",
  },
  {
    id: "5",
    studentId: "CS2021003",
    studentName: "Karan Shah",
    companyName: "Microsoft",
    packageAmount: "2400000",
    position: "Software Engineer",
    placementDate: "2024-03-05",
    department: "Computer Science",
  },
];

export default function DashboardPage() {
  const [faculty] = useState<Faculty[]>(mockFaculty);
  const [companies] = useState<Company[]>(mockCompanies);
  const [placements] = useState<Placement[]>(mockPlacements);

  // Calculate average package
  const averagePackage = placements.length > 0
    ? placements.reduce((sum, p) => sum + parseFloat(p.packageAmount), 0) / placements.length
    : 0;

  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dean Office Dashboard</h1>
            <p className="text-slate-600 mt-1">Overview of faculty, placements, and companies</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-600">Total Placements</p>
              <p className="text-2xl font-bold text-slate-900">{placements.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Average Package</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(averagePackage)}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{faculty.length}</div>
              <p className="text-xs text-slate-600">Across all departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <Building2 className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companies.length}</div>
              <p className="text-xs text-slate-600">Recruitment partners</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Placements</CardTitle>
              <Briefcase className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{placements.length}</div>
              <p className="text-xs text-slate-600">Students placed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Package</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(averagePackage)}
              </div>
              <p className="text-xs text-slate-600">Annual CTC</p>
            </CardContent>
          </Card>
        </div>

        {/* Faculty Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Faculty Information
            </CardTitle>
            <CardDescription>List of all faculty members across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold text-sm">Name</th>
                    <th className="text-left p-3 font-semibold text-sm">Department</th>
                    <th className="text-left p-3 font-semibold text-sm">Designation</th>
                    <th className="text-left p-3 font-semibold text-sm">Qualification</th>
                    <th className="text-left p-3 font-semibold text-sm">Experience</th>
                    <th className="text-left p-3 font-semibold text-sm">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {faculty.map((f) => (
                    <tr key={f.id} className="border-b hover:bg-slate-50">
                      <td className="p-3">
                        <div className="font-medium">{f.name}</div>
                        <div className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                          <Mail className="h-3 w-3" />
                          {f.email}
                        </div>
                      </td>
                      <td className="p-3">{f.department}</td>
                      <td className="p-3">{f.designation}</td>
                      <td className="p-3 text-sm text-slate-600">{f.qualification || "N/A"}</td>
                      <td className="p-3">
                        {f.experience ? `${f.experience} years` : "N/A"}
                      </td>
                      <td className="p-3">
                        {f.phone && (
                          <div className="text-sm text-slate-600 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {f.phone}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Placements Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Placements Information
            </CardTitle>
            <CardDescription>
              Student placement records with package details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">Average Package</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">
                    {formatCurrency(averagePackage)}
                  </p>
                </div>
                <TrendingUp className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold text-sm">Student Name</th>
                    <th className="text-left p-3 font-semibold text-sm">Student ID</th>
                    <th className="text-left p-3 font-semibold text-sm">Company</th>
                    <th className="text-left p-3 font-semibold text-sm">Position</th>
                    <th className="text-left p-3 font-semibold text-sm">Package</th>
                    <th className="text-left p-3 font-semibold text-sm">Department</th>
                    <th className="text-left p-3 font-semibold text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {placements.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-medium">{p.studentName}</td>
                      <td className="p-3 text-sm text-slate-600">{p.studentId}</td>
                      <td className="p-3">{p.companyName}</td>
                      <td className="p-3">{p.position}</td>
                      <td className="p-3 font-semibold text-green-600">
                        {formatCurrency(p.packageAmount)}
                      </td>
                      <td className="p-3">{p.department}</td>
                      <td className="p-3 text-sm text-slate-600">
                        {new Date(p.placementDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Company Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
            <CardDescription>Recruitment partner companies and their details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{company.name}</h3>
                      <p className="text-sm text-slate-600">{company.industry}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {company.placements || 0} placements
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    {company.location && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building2 className="h-4 w-4" />
                        {company.location}
                      </div>
                    )}
                    {company.contactPerson && (
                      <div className="text-slate-600">
                        <span className="font-medium">Contact:</span> {company.contactPerson}
                      </div>
                    )}
                    {company.contactEmail && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="h-4 w-4" />
                        {company.contactEmail}
                      </div>
                    )}
                    {company.website && (
                      <div>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Visit Website →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

