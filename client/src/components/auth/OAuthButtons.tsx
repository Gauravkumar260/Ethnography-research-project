import { Button } from "@/components/ui/button";
import { 
  Github, 
  Mail, 
} from "lucide-react";

export function OAuthButtons() {
  const handleOAuthLogin = (provider: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    window.location.href = `${apiUrl}/api/auth/oauth/${provider}`;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        variant="outline" 
        onClick={() => handleOAuthLogin('google')}
        className="w-full"
      >
        <Mail className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleOAuthLogin('github')}
        className="w-full"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}
