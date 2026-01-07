"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, ArrowRight, FileText } from "lucide-react";
import { toast } from "sonner"; 
import api from "@/lib/api"; // <--- 1. IMPORT THE API HELPER

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
} from "@/components/ui/card";

export default function FacultyLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. REAL BACKEND CONNECTION ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send credentials to your Node.js Server
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });

      // Success! Save the token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));

      toast.success(`Welcome back, ${data.name}!`);
      
      // Redirect to Admin Panel
      router.push("/admin-panel");

    } catch (error: any) {
      // Handle Errors (Wrong password, etc.)
      const message = error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#Eae9e5] flex flex-col justify-center items-center py-20">
      
      {/* Top Brand Section */}
      <div className="text-center mb-10 max-w-lg px-4">
        <div className="mx-auto w-16 h-16 bg-[#99302A] rounded-full flex items-center justify-center shadow-lg mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-3">
          Faculty Login
        </h1>
        <p className="text-[#1a1a1a]/60 text-sm">
          Access the administrative panel to review student submissions and manage research repository
        </p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md border-none shadow-xl bg-white">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-xl text-center font-serif">Sign In</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-[#1a1a1a]/60 font-bold">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="faculty@unheardindia.org"
                className="bg-white border-[#1a1a1a]/10 focus:border-[#99302A]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-[#1a1a1a]/60 font-bold">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                className="bg-white border-[#1a1a1a]/10 focus:border-[#99302A]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#1a1a1a]/70 cursor-pointer">
                <input type="checkbox" className="accent-[#99302A]" /> Remember me
              </label>
              <Link href="#" className="text-[#99302A] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#99302A] hover:bg-[#7a2621] text-white py-6 text-sm font-medium tracking-wide transition-all" 
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>

            {/* Demo Credentials Box */}
            <div className="bg-[#FAFAF9] border border-[#1a1a1a]/5 p-4 rounded text-center mt-6">
              <p className="text-xs text-[#1a1a1a]/50 mb-2 font-semibold">Demo Credentials for Testing:</p>
              <div className="text-xs text-[#1a1a1a]/80 space-y-1 font-mono">
                <p>Email: faculty@unheardindia.org</p>
                <p>Password: admin123</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Back Link */}
      <div className="mt-8">
        <Link 
          href="/research" 
          className="text-[#99302A] text-sm hover:underline flex items-center gap-1 font-medium"
        >
          ← Back to Research Hub
        </Link>
      </div>

      {/* Security Footer Section */}
      <div className="mt-20 max-w-4xl w-full px-4">
        <div className="text-center mb-8">
          <h3 className="text-sm font-serif font-bold text-[#1a1a1a]">Security & Access</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#99302A]/10 flex items-center justify-center text-[#99302A] mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-[#1a1a1a] mb-1">Secure Access</h4>
            <p className="text-[10px] text-[#1a1a1a]/60 max-w-[200px]">All connections are encrypted using industry-standard SSL/TLS protocols</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#99302A]/10 flex items-center justify-center text-[#99302A] mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-[#1a1a1a] mb-1">Role-Based Access</h4>
            <p className="text-[10px] text-[#1a1a1a]/60 max-w-[200px]">Faculty members have controlled access based on their department and role</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#99302A]/10 flex items-center justify-center text-[#99302A] mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-[#1a1a1a] mb-1">Audit Logs</h4>
            <p className="text-[10px] text-[#1a1a1a]/60 max-w-[200px]">All administrative actions are logged for transparency and security</p>
          </div>
        </div>
      </div>
    </div>
  );
}