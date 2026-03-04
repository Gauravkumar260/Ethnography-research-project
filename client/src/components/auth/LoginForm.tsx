"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/auth/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useAuthStore } from "@/lib/auth/store";
import { getDeviceFingerprint } from "@/lib/auth/fingerprint";
import { SSOButton } from "./SSOButton";
import { OAuthButtons } from "./OAuthButtons";

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresMfa, setRequiresMfa] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      mfaToken: ""
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Fetch CSRF token first (mandatory for mutating routes)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const csrfRes = await fetch(`${apiUrl}/api/csrf-token`);
      const { csrfToken } = await csrfRes.json();

      // 2. Generate Device Fingerprint
      const deviceFingerprint = await getDeviceFingerprint();

      // 3. Perform Login
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken 
        },
        body: JSON.stringify({
          ...data,
          deviceFingerprint
        })
      });

      const result = await response.json();

      if (response.status === 200 && result.requiresMfa) {
        setRequiresMfa(true);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to login");
      }

      // Handle successful login
      setAuth(result.user, result.accessToken);
      
      window.location.href = '/dashboard';

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "Playfair Display, serif" }}>
          Researcher Portal
        </h1>
        <p className="text-slate-500">Sign in to your university account</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@university.edu" disabled={isLoading || requiresMfa} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!requiresMfa && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Password</FormLabel>
                    <Link href="/auth/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        disabled={isLoading} 
                        {...field} 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {requiresMfa && (
            <FormField
              control={form.control}
              name="mfaToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authenticator Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="000000" 
                      maxLength={6}
                      className="text-center tracking-[0.5em] text-lg font-mono"
                      disabled={isLoading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {!requiresMfa && (
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal text-slate-600">
                      Remember this device for 30 days
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full bg-[#0a192f] hover:bg-[#112240] text-white" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {requiresMfa ? "Verify Code" : "Sign In"}
          </Button>
        </form>
      </Form>

      {!requiresMfa && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <SSOButton />
            <OAuthButtons />
          </div>

          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-800">
              Register here
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
