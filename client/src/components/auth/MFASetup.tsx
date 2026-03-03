import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface MFASetupProps {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
  onVerify: (token: string) => Promise<void>;
}

export function MFASetup({ secret, qrCodeUrl, backupCodes, onVerify }: MFASetupProps) {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onVerify(token);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadBackupCodes = () => {
    const element = document.createElement("a");
    const file = new Blob([backupCodes.join('
')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "backup-codes.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium">Set up Two-Factor Authentication</h3>
        <p className="text-sm text-gray-500">Scan the QR code with your authenticator app.</p>
      </div>

      <div className="flex justify-center bg-white p-4 rounded-md">
        <QRCodeSVG value={qrCodeUrl} size={200} />
      </div>

      <div className="text-center text-sm">
        <p>Or enter this code manually:</p>
        <code className="bg-gray-100 p-2 rounded block mt-2 tracking-widest font-mono">
          {secret}
        </code>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 border"
            placeholder="000000"
            maxLength={6}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || token.length !== 6}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify & Enable'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900">Backup Codes</h4>
          <button
            type="button"
            onClick={() => setShowBackupCodes(!showBackupCodes)}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            {showBackupCodes ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showBackupCodes && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-3">
              Save these backup codes in a secure place. They can be used to log in if you lose access to your authenticator app.
            </p>
            <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 rounded-md font-mono text-sm">
              {backupCodes.map((code, index) => (
                <div key={index} className="text-gray-800">{code}</div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleDownloadBackupCodes}
              className="mt-3 text-xs text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
            >
              Download Codes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
