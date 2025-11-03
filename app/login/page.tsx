"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement authentication logic
    console.log("Login attempt with:", formData);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 relative overflow-hidden ${inter.className}`}>
      {/* MIT-WPU Logo - Increased size */}
      <div className="absolute top-4 left-4 z-20">
        <Image
          src="/mitwpu-logo.png"
          alt="MIT-WPU Logo"
          width={200}
          height={60}
          className="h-16 w-auto"
          priority
        />
      </div>
      {/* Animated background elements */}
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-100 rounded-full mix-blend-multiply opacity-30 animate-blob"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-100 rounded-full mix-blend-multiply opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-100 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-4000"></div>
      
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm z-10">
        <CardHeader className="space-y-1 pt-8">
          <CardTitle className="text-2xl font-semibold text-center text-gray-900">
            Dean Dashboard
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@mitwpu.edu.in"
                required
                value={formData.email}
                onChange={handleChange}
                className="border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-sm h-10 text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-sm h-10 text-gray-800"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 rounded-sm transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
