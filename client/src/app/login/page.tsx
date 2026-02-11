"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Lock, ArrowRight, FileText, Loader2, Mail } from "lucide-react";
import { toast } from "sonner"; 
import api from "@/lib/api"; 

export default function FacultyLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- LOGIN LOGIC ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Send credentials to Backend
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });

      // 2. Save Token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));

      toast.success(`Welcome back! Access granted.`);
      
      // 3. Redirect to Admin Dashboard
      // Note: We use window.location to ensure a full refresh of the admin state
      window.location.href = "/admin";

    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = (error as any).response?.data?.message || "Invalid credentials.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#Eae9e5] flex flex-col justify-center items-center py-20 px-4">
      
      {/* BRANDING SECTION */}
      <div className="text-center mb-10 max-w-lg">
        <div className="mx-auto w-16 h-16 bg-[#99302A] rounded-full flex items-center justify-center shadow-lg mb-6 ring-4 ring-[#99302A]/10">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-3">
          Faculty Login
        </h1>
        <p className="text-[#1a1a1a]/60 text-sm leading-relaxed">
          Access the administrative panel to review student submissions and manage the ethnographic repository.
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-[#1a1a1a]/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1a1a1a] p-6 text-center">
          <h2 className="text-[#E3E1DB] text-lg font-serif tracking-wide">Secure Sign In</h2>
        </div>
        
        {/* Form Content */}
        <div className="p-8 pt-10">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 block">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 group-focus-within:text-[#99302A] transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="faculty@university.edu"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAF9] border border-[#1a1a1a]/10 rounded-sm focus:outline-none focus:border-[#99302A] focus:bg-white transition-all text-[#1a1a1a]"
                  required 
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 block">
                Password
              </label>
              <div className="relative group">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 group-focus-within:text-[#99302A] transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAF9] border border-[#1a1a1a]/10 rounded-sm focus:outline-none focus:border-[#99302A] focus:bg-white transition-all text-[#1a1a1a]"
                  required 
                />
              </div>
            </div>

            {/* Helper Links */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#1a1a1a]/70 cursor-pointer hover:text-[#1a1a1a]">
                <input type="checkbox" className="accent-[#99302A]" /> Remember me
              </label>
              <Link href="#" className="text-[#99302A] hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-[#99302A] hover:bg-[#7a2621] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Demo Credentials (Optional: Remove in Production) */}
            <div className="bg-[#FAFAF9] border border-[#1a1a1a]/5 p-4 rounded text-center mt-6">
              <p className="text-[10px] text-[#1a1a1a]/40 mb-1 font-bold uppercase tracking-wider">Demo Credentials</p>
              <div className="text-xs text-[#1a1a1a]/70 font-mono">
                admin@university.edu / admin123
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Back Link */}
      <div className="mt-8">
        <Link 
          href="/" 
          className="text-[#1a1a1a]/50 text-sm hover:text-[#99302A] transition-colors flex items-center gap-2 font-medium"
        >
          ← Back to Research Hub
        </Link>
      </div>

      {/* FOOTER BADGES */}
      
      <div className="mt-16 w-full max-w-4xl border-t border-[#1a1a1a]/5 pt-8">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center group">
            <Shield className="w-6 h-6 text-[#1a1a1a]/20 mb-2 group-hover:text-[#99302A] transition-colors" />
            <h4 className="text-xs font-bold text-[#1a1a1a] mb-1">Encrypted</h4>
            <p className="text-[10px] text-[#1a1a1a]/50">256-bit SSL Data Encryption</p>
          </div>
          <div className="flex flex-col items-center group">
            <Lock className="w-6 h-6 text-[#1a1a1a]/20 mb-2 group-hover:text-[#99302A] transition-colors" />
            <h4 className="text-xs font-bold text-[#1a1a1a] mb-1">Role-Based</h4>
            <p className="text-[10px] text-[#1a1a1a]/50">Strict Access Control</p>
          </div>
          <div className="flex flex-col items-center group">
            <FileText className="w-6 h-6 text-[#1a1a1a]/20 mb-2 group-hover:text-[#99302A] transition-colors" />
            <h4 className="text-xs font-bold text-[#1a1a1a] mb-1">Logged</h4>
            <p className="text-[10px] text-[#1a1a1a]/50">Audit Trails for all Actions</p>
          </div>
        </div>
      </div>
    </div>
  );
}