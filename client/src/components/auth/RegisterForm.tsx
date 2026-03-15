"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/lib/auth/validations";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { AlertCircle, Loader2, ShieldCheck, Mail, ArrowRight, User, Lock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslations } from 'next-intl';

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const t = useTranslations('Register');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", role: "STUDENT" },
  });

  const passwordValue = form.watch("password");

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true); 
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password, role: data.role })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to register");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="mx-auto w-20 h-20 bg-[#99302A]/10 rounded-full flex items-center justify-center">
          <Mail className="w-10 h-10 text-[#99302A]" />
        </div>
        <h2 className="text-2xl font-bold font-serif text-[#1a1a1a]">Check your inbox</h2>
        <p className="text-[#1a1a1a]/70 font-sans leading-relaxed">
          {t('verifyMsg', { email: form.getValues('email'), defaultValue: `We've sent a verification link to ${form.getValues('email')}. Please click the link to activate your account.` })}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 rounded-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">Registration Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 block">
                {t('fullName', { defaultValue: 'Full Name' })}
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 group-focus-within:text-[#99302A] transition-colors" />
                  <Input 
                    placeholder="Dr. Jane Doe" 
                    disabled={isLoading} 
                    className="w-full pl-10 pr-4 py-6 bg-[#FAFAF9] border border-[#1a1a1a]/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#99302A] focus:border-[#99302A] focus:bg-white transition-all text-[#1a1a1a] text-base" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage className="text-[#99302A] text-xs" />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 block">
                {t('institutionEmail', { defaultValue: 'Institution Email' })}
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
              <p className="text-[11px] text-[#1a1a1a]/40 font-medium">Please use your official .edu email address.</p>
              <FormMessage className="text-[#99302A] text-xs" />
            </FormItem>
          )} />

          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/70 border-b border-[#1a1a1a]/10 pb-2 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#99302A]" /> {t('security', { defaultValue: 'Security' })}
            </h3>
            
            <div className="space-y-4">
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 block">
                    {t('securePassword', { defaultValue: 'Secure Password' })}
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 group-focus-within:text-[#99302A] transition-colors" />
                      <Input 
                        type="password" 
                        disabled={isLoading} 
                        className="w-full pl-10 pr-4 py-6 bg-[#FAFAF9] border border-[#1a1a1a]/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#99302A] focus:border-[#99302A] focus:bg-white transition-all text-[#1a1a1a] text-base" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <PasswordStrengthMeter password={passwordValue} />
                  <FormMessage className="text-[#99302A] text-xs" />
                </FormItem>
              )} />

              <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 block">
                    {t('confirmPassword', { defaultValue: 'Confirm Password' })}
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 group-focus-within:text-[#99302A] transition-colors" />
                      <Input 
                        type="password" 
                        disabled={isLoading} 
                        className="w-full pl-10 pr-4 py-6 bg-[#FAFAF9] border border-[#1a1a1a]/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#99302A] focus:border-[#99302A] focus:bg-white transition-all text-[#1a1a1a] text-base" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[#99302A] text-xs" />
                </FormItem>
              )} />
            </div>
          </div>

          <FormField control={form.control} name="acceptTerms" render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
              <FormControl>
                <input 
                  type="checkbox" 
                  className="accent-[#99302A] w-5 h-5 rounded-sm mt-1" 
                  checked={field.value === true} 
                  onChange={(e) => field.onChange(e.target.checked)} 
                  disabled={isLoading} 
                />
              </FormControl>
              <div className="space-y-1 leading-relaxed">
                <FormLabel className="font-medium text-[#1a1a1a]/70 text-sm cursor-pointer hover:text-[#1a1a1a]">
                  {t('termsLabel', { defaultValue: 'I agree to the Research Ethics Guidelines and Data Privacy Terms.' })}
                </FormLabel>
                <FormMessage className="text-[#99302A] text-xs" />
              </div>
            </FormItem>
          )} />

          <button 
            type="submit" 
            className="w-full mt-2 bg-[#99302A] hover:bg-[#7a2621] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                {t('submitApp', { defaultValue: 'Submit Application' })} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </Form>
    </div>
  );
}