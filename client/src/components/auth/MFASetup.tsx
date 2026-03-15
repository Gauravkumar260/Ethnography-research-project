"use client";

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Input } from '@/components/ui/input';
import { Check, Copy, Download, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function MFASetup() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  
  // Mock data for UI demonstration
  const secret = "JBSWY3DPEHPK3PXP";
  const qrCodeUrl = "otpauth://totp/ResearchPortal:user@university.edu?secret=JBSWY3DPEHPK3PXP&issuer=ResearchPortal";
  const backupCodes = ["AB12C34D", "EF56G78H", "IJ90K12L", "MN34O56P", "QR78S90T", "UV12W34X"];

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      toast.success("MFA successfully enabled");
    }, 1000);
  };

  const downloadCodes = () => {
    const element = document.createElement("a");
    const file = new Blob([backupCodes.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "mfa-backup-codes.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Codes downloaded");
  };

  const copyCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    toast.success("Codes copied to clipboard");
  };

  return (
    <div className="space-y-8">
      {/* Progress Dots */}
      <div className="flex justify-center gap-3">
        {[1, 2, 3].map(i => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full ${step >= i ? 'bg-[#99302A]' : 'bg-[#1a1a1a]/10'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <div className="text-center">
            <h3 className="text-xl font-bold font-serif text-[#1a1a1a]">Scan QR Code</h3>
            <p className="text-[#1a1a1a]/70 mt-2 font-sans text-sm">Open your authenticator app and scan the code below.</p>
          </div>
          <div className="flex justify-center bg-white p-6 rounded-sm border border-[#1a1a1a]/10 shadow-sm mx-auto w-fit">
            <QRCodeSVG value={qrCodeUrl} size={200} />
          </div>
          <div className="text-center">
            <p className="text-sm text-[#1a1a1a]/50 mb-2">Can't scan the code? Use this setup key:</p>
            <code className="bg-[#FAFAF9] px-4 py-2 rounded-sm border border-[#1a1a1a]/10 font-mono tracking-widest text-[#1a1a1a] font-medium">{secret}</code>
          </div>
          <button 
            className="w-full mt-4 bg-[#1a1a1a] hover:bg-[#333] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md"
            onClick={() => setStep(2)}
          >
            Next Step
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <div className="text-center">
            <h3 className="text-xl font-bold font-serif text-[#1a1a1a]">Verify Code</h3>
            <p className="text-[#1a1a1a]/70 mt-2 font-sans text-sm">Enter the 6-digit code from your authenticator app.</p>
          </div>
          <form onSubmit={handleVerify} className="space-y-6">
            <Input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              maxLength={6}
              className="h-16 text-center tracking-[1em] text-3xl font-mono bg-[#FAFAF9] focus:bg-white border-[#1a1a1a]/20 focus:border-[#99302A] focus:ring-1 focus:ring-[#99302A] rounded-sm transition-all"
              required
            />
            <div className="flex gap-3">
              <button 
                type="button" 
                className="flex-1 bg-transparent hover:bg-[#1a1a1a]/5 text-[#1a1a1a] border border-[#1a1a1a]/20 py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="flex-[2] bg-[#99302A] hover:bg-[#7a2621] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                disabled={token.length !== 6 || loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Enable"}
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#1a1a1a]">Save Backup Codes</h3>
            <p className="text-[#1a1a1a]/70 mt-2 text-sm leading-relaxed">
              If you lose your device, these codes are the only way to access your account. Keep them safe.
            </p>
          </div>

          <div className="relative group">
            <div className={`grid grid-cols-2 gap-3 p-6 bg-[#FAFAF9] rounded-sm font-mono text-center tracking-widest border border-[#1a1a1a]/5 ${!showBackupCodes && 'blur-md select-none'}`}>
              {backupCodes.map((code, i) => (
                <div key={i} className="bg-white py-3 rounded-sm border border-[#1a1a1a]/10 shadow-sm text-sm text-[#1a1a1a] font-bold">{code}</div>
              ))}
            </div>
            {!showBackupCodes && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setShowBackupCodes(true)} 
                  className="bg-white hover:bg-gray-50 text-[#1a1a1a] border border-[#1a1a1a]/20 py-2 px-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" /> Reveal Codes
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button 
              className="flex-1 bg-transparent hover:bg-[#1a1a1a]/5 text-[#1a1a1a] border border-[#1a1a1a]/20 py-3 text-sm font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center gap-2 disabled:opacity-50"
              onClick={copyCodes} 
              disabled={!showBackupCodes}
            >
              <Copy className="w-4 h-4" /> Copy
            </button>
            <button 
              className="flex-1 bg-transparent hover:bg-[#1a1a1a]/5 text-[#1a1a1a] border border-[#1a1a1a]/20 py-3 text-sm font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center gap-2 disabled:opacity-50"
              onClick={downloadCodes} 
              disabled={!showBackupCodes}
            >
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
          
          <button 
            className="w-full mt-2 bg-[#99302A] hover:bg-[#7a2621] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md"
            onClick={() => window.location.href = '/dashboard'}
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}