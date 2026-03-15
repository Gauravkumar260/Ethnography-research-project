"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle, CheckCircle2, Loader2, Eye, EyeOff, Shield, Lock, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import Link from "next/link";

const resetPasswordSchema = z.object({
  password: z.string().min(12, { message: "Password must be at least 12 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordValue = form.watch("password");

  async function onSubmit(data: ResetPasswordValues) {
    if (!token) {
      setStatus("error");
      setMessage("Missing reset token.");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: data.password
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(result.message || "Password updated successfully.");
      } else {
        setStatus("error");
        setMessage(result.message || "Failed to reset password.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("A connection error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#Eae9e5] flex flex-col justify-center items-center py-20 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border border-[#1a1a1a]/5 overflow-hidden p-8 sm:p-10">
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 rounded-sm mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-bold">Invalid Link</AlertTitle>
            <AlertDescription>No reset token found in the URL. Please check your email link.</AlertDescription>
          </Alert>
          <Link 
            href="/auth/forgot-password"
            className="w-full bg-[#1a1a1a] hover:bg-[#333] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md flex items-center justify-center"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#Eae9e5] flex flex-col justify-center items-center py-20 px-4">
      
      {/* BRANDING SECTION */}
      <div className="text-center mb-10 max-w-lg">
        <div className="mx-auto w-16 h-16 bg-[#99302A] rounded-full flex items-center justify-center shadow-lg mb-6 ring-4 ring-[#99302A]/10">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-4">
          Create New Password
        </h1>
        <p className="text-[#1a1a1a]/70 text-base font-sans leading-relaxed">
          Ensure your new password is at least 12 characters and highly secure.
        </p>
      </div>

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border border-[#1a1a1a]/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1a1a1a] p-6 text-center">
          <h2 className="text-[#E3E1DB] text-lg font-serif tracking-widest uppercase">Set Password</h2>
        </div>
        
        {/* Content */}
        <div className="p-8 sm:p-10">

          {status === "success" && (
            <div className="text-center space-y-6 py-4">
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-200">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#1a1a1a] mb-2">Password Reset</h3>
                <p className="text-[#1a1a1a]/70 font-sans text-sm leading-relaxed">{message}</p>
              </div>
              <Link 
                href="/auth/login"
                className="w-full mt-4 bg-[#99302A] hover:bg-[#7a2621] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md flex items-center justify-center gap-2"
              >
                Proceed to Login <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {status === "error" && (
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 rounded-sm mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold">Error</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {status !== "success" && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 block">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 group-focus-within:text-[#99302A] transition-colors" />
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            disabled={isLoading} 
                            className="w-full pl-10 pr-12 py-6 bg-[#FAFAF9] border border-[#1a1a1a]/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#99302A] focus:border-[#99302A] focus:bg-white transition-all text-[#1a1a1a] text-base" 
                            {...field} 
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/40 hover:text-[#99302A] transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <div className="pt-2">
                        <PasswordStrengthMeter password={passwordValue} />
                      </div>
                      <FormMessage className="text-[#99302A] text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 block">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 group-focus-within:text-[#99302A] transition-colors" />
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            disabled={isLoading} 
                            className="w-full pl-10 pr-12 py-6 bg-[#FAFAF9] border border-[#1a1a1a]/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#99302A] focus:border-[#99302A] focus:bg-white transition-all text-[#1a1a1a] text-base" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[#99302A] text-xs" />
                    </FormItem>
                  )}
                />

                <button 
                  type="submit" 
                  className="w-full mt-4 bg-[#99302A] hover:bg-[#7a2621] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      Update Password <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#Eae9e5] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#99302A]" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
