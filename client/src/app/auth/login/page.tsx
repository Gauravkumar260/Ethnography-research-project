import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { Shield, Lock, FileText } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#Eae9e5] flex flex-col justify-center items-center py-20 px-4">
      
      {/* BRANDING SECTION */}
      <div className="text-center mb-10 max-w-lg">
        <div className="mx-auto w-16 h-16 bg-[#99302A] rounded-full flex items-center justify-center shadow-lg mb-6 ring-4 ring-[#99302A]/10">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-4">
          Welcome Back
        </h1>
        <p className="text-[#1a1a1a]/70 text-base font-sans leading-relaxed">
          Sign in to access your ethnographic research dashboard, submissions, and field data.
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border border-[#1a1a1a]/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1a1a1a] p-6 text-center">
          <h2 className="text-[#E3E1DB] text-lg font-serif tracking-widest uppercase">Secure Sign In</h2>
        </div>
        
        {/* Form Content */}
        <div className="p-8 sm:p-10">
          <LoginForm />

          {/* Demo Credentials (Optional: Remove in Production) */}
          <div className="bg-[#FAFAF9] border border-[#1a1a1a]/5 p-4 rounded text-center mt-8">
            <p className="text-[10px] text-[#1a1a1a]/40 mb-1 font-bold uppercase tracking-wider">Demo Credentials</p>
            <div className="text-xs text-[#1a1a1a]/70 font-mono">
              admin@university.edu / admin123
            </div>
          </div>

          <div className="mt-8 text-center text-sm font-medium text-[#1a1a1a]/70 border-t border-[#1a1a1a]/10 pt-6">
            New to the Research Hub?{" "}
            <Link href="/auth/register" className="text-[#99302A] hover:underline font-bold">
              Apply for Access
            </Link>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="mt-8">
        <Link 
          href="/" 
          className="text-[#1a1a1a]/50 text-sm hover:text-[#99302A] transition-colors flex items-center gap-2 font-medium"
        >
          ← Return to Portal
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
