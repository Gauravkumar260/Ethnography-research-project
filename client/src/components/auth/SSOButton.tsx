import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SSOButton({ className }: { className?: string }) {
  const handleSSO = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    window.location.href = `${apiUrl}/api/auth/oauth/microsoft`;
  };

  return (
    <Button 
      variant="secondary" 
      onClick={handleSSO}
      className={cn("w-full bg-[#0078d4] hover:bg-[#005a9e] text-white border-none", className)}
    >
      <svg className="mr-2 h-4 w-4" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h11.022v11.022H0z" fill="#f25022"/><path d="M11.978 0H23v11.022H11.978z" fill="#7fba00"/><path d="M0 11.978h11.022V23H0z" fill="#00a4ef"/><path d="M11.978 11.978H23V23H11.978z" fill="#ffb900"/>
      </svg>
      Sign in with University Account
    </Button>
  );
}
