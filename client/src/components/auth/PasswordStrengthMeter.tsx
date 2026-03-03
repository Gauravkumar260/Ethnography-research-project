"use client";

import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthMeterProps {
  password?: string;
}

export function PasswordStrengthMeter({ password = "" }: PasswordStrengthMeterProps) {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    if (!password) {
      setScore(0);
      setFeedback([]);
      return;
    }

    const result = zxcvbn(password);
    setScore(result.score);
    setFeedback(result.feedback.suggestions || []);
  }, [password]);

  const getColor = (score: number) => {
    switch (score) {
      case 0: return "bg-red-500";
      case 1: return "bg-orange-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-lime-500";
      case 4: return "bg-green-500";
      default: return "bg-slate-200";
    }
  };

  const getLabel = (score: number) => {
    switch (score) {
      case 0: return "Very Weak";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "";
    }
  };

  // Score is 0-4, progress value is 0-100
  const progressValue = password ? ((score + 1) / 5) * 100 : 0;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-medium text-slate-500">Password Strength</span>
        <span className={`font-semibold ${password ? "" : "opacity-0"}`}>{getLabel(score)}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getColor(score)}`} 
          style={{ width: `${progressValue}%` }}
        />
      </div>
      {feedback.length > 0 && (
        <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
          {feedback.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
      <div className="text-xs text-slate-500 flex gap-4 mt-2">
        <span className={password.length >= 12 ? "text-green-600" : ""}>✓ 12+ chars</span>
        <span className={/[A-Z]/.test(password) ? "text-green-600" : ""}>✓ Uppercase</span>
        <span className={/[0-9]/.test(password) ? "text-green-600" : ""}>✓ Number</span>
        <span className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : ""}>✓ Symbol</span>
      </div>
    </div>
  );
}
