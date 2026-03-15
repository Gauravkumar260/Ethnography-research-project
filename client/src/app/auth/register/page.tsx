import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#Eae9e5] flex flex-col justify-center items-center py-20 px-4">
      
      {/* BRANDING SECTION */}
      <div className="text-center mb-10 max-w-lg">
        <div className="mx-auto w-16 h-16 bg-[#99302A] rounded-full flex items-center justify-center shadow-lg mb-6 ring-4 ring-[#99302A]/10">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-4">
          Request Access
        </h1>
        <p className="text-[#1a1a1a]/70 text-base font-sans leading-relaxed">
          Apply for an account to participate in ethnographic research and submit your field data.
        </p>
      </div>

      {/* REGISTER CARD */}
      <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl border border-[#1a1a1a]/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1a1a1a] p-6 text-center">
          <h2 className="text-[#E3E1DB] text-lg font-serif tracking-widest uppercase">Researcher Application</h2>
        </div>
        
        {/* Form Content */}
        <div className="p-8 sm:p-10">
          <RegisterForm />

          <div className="mt-8 text-center text-sm font-medium text-[#1a1a1a]/70 border-t border-[#1a1a1a]/10 pt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#99302A] hover:underline font-bold">
              Sign In
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
    </div>
  );
}
