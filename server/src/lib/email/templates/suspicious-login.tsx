import React from 'react';

interface SuspiciousLoginTemplateProps {
  ipAddress: string;
  userAgent: string;
  time: string;
  location: string;
}

export const SuspiciousLoginTemplate: React.FC<SuspiciousLoginTemplateProps> = ({ ipAddress, userAgent, time, location }) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
    <h2 style={{ color: '#d4183d' }}>Suspicious Login Attempt Blocked</h2>
    <p>We detected a highly suspicious login attempt to your account that was blocked by our security system.</p>
    <ul>
      <li><strong>Time:</strong> {time}</li>
      <li><strong>IP Address:</strong> {ipAddress}</li>
      <li><strong>Device/Browser:</strong> {userAgent}</li>
      <li><strong>Estimated Location:</strong> {location}</li>
    </ul>
    <p>If this was not you, please reset your password immediately. If this was you, you may need to use MFA or a trusted device to log in.</p>
  </div>
);
