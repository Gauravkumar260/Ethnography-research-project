import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 bg-[url('/assets/hero-image.png')] bg-cover bg-blend-overlay bg-white/90">
      <Card className="w-full max-w-md p-8 shadow-xl border-slate-200">
        <LoginForm />
        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link href="/auth/register" className="font-medium text-[#0a192f] hover:underline">
            Register here
          </Link>
        </div>
      </Card>
    </div>
  );
}
