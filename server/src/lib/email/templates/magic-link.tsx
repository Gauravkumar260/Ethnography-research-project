import React from 'react';

interface MagicLinkTemplateProps {
  url: string;
}

export const MagicLinkTemplate: React.FC<MagicLinkTemplateProps> = ({ url }) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
    <h2 style={{ color: '#0A1128' }}>Log In to Your Account</h2>
    <p>Click the secure link below to securely log in to the University Research Portal. This link is valid for 15 minutes.</p>
    <a href={url} style={{ display: 'inline-block', background: '#D4AF37', color: '#0A1128', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
      Log In Now
    </a>
    <p>If you did not request this link, you can safely ignore this email.</p>
  </div>
);
