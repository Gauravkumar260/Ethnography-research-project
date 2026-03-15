"use client";

import { useState } from "react";
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
import { AlertCircle, CheckCircle2, Loader2, Shield, Mail, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: ForgotPasswordValues) {
    setIsLoading(true);
    setStatus("idle");
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(result.message || "If that email exists, a reset link was sent.");
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("A connection error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#Eae9e5] flex flex-col justify-center items-center py-20 px-4">
      
      {/* BRANDING SECTION */}
      <div className="text-center mb-10 max-w-lg">
        <div className="mx-auto w-16 h-16 bg-[#99302A] rounded-full flex items-center justify-center shadow-lg mb-6 ring-4 ring-[#99302A]/10">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-4">
          Reset Password
        </h1>
        <p className="text-[#1a1a1a]/70 text-base font-sans leading-relaxed">
          Enter your institutional email address to receive a secure link to reset your password.
        </p>
      </div>

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border border-[#1a1a1a]/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1a1a1a] p-6 text-center">
          <h2 className="text-[#E3E1DB] text-lg font-serif tracking-widest uppercase">Account Recovery</h2>
        </div>
        
        {/* Content */}
        <div className="p-8 sm:p-10">

          {status === "success" && (
            <div className="text-center space-y-6 py-4">
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-200">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#1a1a1a] mb-2">Check your inbox</h3>
                <p className="text-[#1a1a1a]/70 font-sans text-sm leading-relaxed">{message}</p>
              </div>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 block">
                        Institution Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 group-focus-within:text-[#99302A] transition-colors" />
                          <Input 
                            placeholder="name@university.edu" 
                            disabled={isLoading} 
                            className="w-full pl-10 pr-4 py-6 bg-[#FAFAF9] border border-[#1a1a1a]/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#99302A] focus:border-[#99302A] focus:bg-white transition-all text-[#1a1a1a] text-base" 
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
                  className="w-full mt-2 bg-[#99302A] hover:bg-[#7a2621] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending Link...
                    </>
                  ) : (
                    <>
                      Send Reset Link <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </Form>
          )}

          <div className="mt-8 text-center text-sm font-medium text-[#1a1a1a]/70 border-t border-[#1a1a1a]/10 pt-6">
            Remember your password?{" "}
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