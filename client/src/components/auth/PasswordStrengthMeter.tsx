import React, { useMemo } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password?: string;
}

export function PasswordStrengthMeter({ password = '' }: PasswordStrengthMeterProps) {
  const { score, rules } = useMemo(() => {
    const minLength = password.length >= 12;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Simple score proxy 0-4 based on rules
    const rulesMet = [minLength, hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length;
    const strengthScore = password.length === 0 ? 0 : Math.min(4, Math.max(1, Math.floor((rulesMet / 5) * 4)));

    return {
      score: strengthScore,
      rules: { minLength, hasUpper, hasLower, hasDigit, hasSpecial }
    };
  }, [password]);

  const getColor = (s: number) => {
    if (s === 0) return 'bg-muted';
    if (s <= 1) return 'bg-destructive';
    if (s === 2) return 'bg-amber-500';
    if (s === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getLabel = (s: number) => {
    if (s === 0) return 'None';
    if (s <= 1) return 'Weak';
    if (s === 2) return 'Fair';
    if (s === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-4 mt-2">
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((segment) => (
          <div 
            key={segment} 
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${score >= segment ? getColor(score) : 'bg-muted'}`} 
          />
        ))}
      </div>
      <div className="text-sm font-medium text-muted-foreground flex justify-between">
        <span>Password Strength</span>
        <span className={score >= 3 ? 'text-green-600' : 'text-muted-foreground'}>{getLabel(score)}</span>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground bg-muted/30 p-4 rounded-md">
        <p className="font-medium text-foreground">Password must contain:</p>
        <ul className="grid grid-cols-2 gap-2">
          <li className="flex items-center gap-2">
            {rules.minLength ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
            At least 12 characters
          </li>
          <li className="flex items-center gap-2">
            {rules.hasUpper ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
            Uppercase letter
          </li>
          <li className="flex items-center gap-2">
            {rules.hasLower ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
            Lowercase letter
          </li>
          <li className="flex items-center gap-2">
            {rules.hasDigit ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
            Number
          </li>
          <li className="flex items-center gap-2">
            {rules.hasSpecial ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
            Special character
          </li>
        </ul>
      </div>
    </div>
  );
}
