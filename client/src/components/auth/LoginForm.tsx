"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/auth/validations";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle, Eye, EyeOff, Loader2, ShieldAlert, ArrowRight, Lock, Mail } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useAuthStore } from "@/lib/auth/store";
import { getDeviceFingerprint } from "@/lib/auth/fingerprint";
import { SSOButton } from "./SSOButton";
import { useTranslations } from 'next-intl';

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const t = useTranslations('Login');
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresMfa, setRequiresMfa] = useState(false);
  const [riskWarning, setRiskWarning] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false, mfaToken: "" },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError(null);
    setRiskWarning(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const csrfRes = await fetch(`${apiUrl}/api/csrf-token`);
      const { csrfToken } = await csrfRes.json();
      const deviceFingerprint = await getDeviceFingerprint();

      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify({ ...data, deviceFingerprint })
      });

      const result = await response.json();

      if (response.status === 403 && result.message.includes('locked')) {
        throw new Error("Account locked due to multiple failed attempts. Please try again in 15 minutes.");
      }

      if (response.status === 200 && result.requiresMfa) {
        setRequiresMfa(true);
        setIsLoading(false);
        if (result.riskScore && result.riskScore >= 0.6) {
          setRiskWarning("Unusual login detected. Please provide MFA code to proceed.");
        }
        return;
      }

      if (!response.ok) throw new Error(result.message || "Failed to login");

      setAuth(result.user, result.accessToken);
      window.location.href = '/dashboard';

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 rounded-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">Authentication Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {riskWarning && (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800 rounded-sm">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle className="font-bold">Security Verification</AlertTitle>
          <AlertDescription>{riskWarning}</AlertDescription>
        </Alert>
      )}

      {!requiresMfa && (
        <div className="space-y-4 mb-6">
          <SSOButton className="w-full bg-[#1a1a1a] hover:bg-[#333] text-white h-12 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md" />
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#1a1a1a]/10" /></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-[#1a1a1a]/40">Or continue with email</span>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {!requiresMfa && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
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
                    <FormMessage className="text-[#99302A] text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 block">
                        {t('password', { defaultValue: 'Password' })}
                      </FormLabel>
                    </div>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 group-focus-within:text-[#99302A] transition-colors" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
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
                    <FormMessage className="text-[#99302A] text-xs" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between text-xs pt-1">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <label className="flex items-center gap-2 text-[#1a1a1a]/70 cursor-pointer hover:text-[#1a1a1a] font-medium">
                      <input 
                        type="checkbox" 
                        className="accent-[#99302A] w-4 h-4 rounded-sm" 
                        checked={field.value} 
                        onChange={field.onChange} 
                        disabled={isLoading} 
                      /> 
                      {t('rememberDevice', { defaultValue: 'Remember this device' })}
                    </label>
                  )}
                />
                <Link href="/auth/forgot-password" className="text-[#99302A] hover:underline font-bold">
                  {t('forgotPassword', { defaultValue: 'Forgot password?' })}
                </Link>
              </div>
            </>
          )}

          {requiresMfa && (
            <FormField
              control={form.control}
              name="mfaToken"
              render={({ field }) => (
                <FormItem className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                  <FormLabel className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a] flex items-center justify-center gap-2 mb-4">
                    <ShieldAlert className="w-5 h-5 text-[#99302A]" />
                    {t('authCode', { defaultValue: 'Enter Authentication Code' })}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000000"
                      maxLength={6}
                      className="h-16 text-center tracking-[1em] text-3xl font-mono bg-[#FAFAF9] focus:bg-white border-[#1a1a1a]/20 focus:border-[#99302A] focus:ring-1 focus:ring-[#99302A] rounded-sm transition-all"
                      disabled={isLoading}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.target.value.length === 6) {
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                    />
                  </FormControl>
                  <p className="text-center text-xs text-[#1a1a1a]/50">
                    Open your authenticator app to view your 6-digit code.
                  </p>
                  <FormMessage className="text-[#99302A] text-xs text-center" />
                </FormItem>
              )}
            />
          )}

          <button 
            type="submit" 
            className="w-full mt-4 bg-[#99302A] hover:bg-[#7a2621] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
              </>
            ) : (
              <>
                {requiresMfa ? t('verifyCode', { defaultValue: 'Verify Code' }) : t('signIn', { defaultValue: 'Sign In' })} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </Form>
    </div>
  );
}