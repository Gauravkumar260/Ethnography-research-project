import React from 'react';

interface MfaBackupCodesTemplateProps {
  codes: string[];
}

export const MfaBackupCodesTemplate: React.FC<MfaBackupCodesTemplateProps> = ({ codes }) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
    <h2 style={{ color: '#0A1128' }}>Your MFA Backup Codes</h2>
    <p>You have successfully enabled Multi-Factor Authentication. Please store these backup codes in a secure location (like a password manager). You can use them to log in if you lose access to your authenticator app.</p>
    <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px', fontFamily: 'monospace', fontSize: '16px', letterSpacing: '2px' }}>
      {codes.map((code, index) => (
        <div key={index} style={{ marginBottom: '5px' }}>{code}</div>
      ))}
    </div>
    <p style={{ color: '#d4183d', fontWeight: 'bold' }}>Warning: Each code can only be used once.</p>
  </div>
);
