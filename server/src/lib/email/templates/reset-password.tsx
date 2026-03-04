import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ResetPasswordTemplateProps {
  url: string;
}

export const ResetPasswordTemplate = ({ url }: ResetPasswordTemplateProps) => (
  <Html>
    <Head />
    <Preview>Password reset request — University Research Portal</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>University Portal</Heading>
        </Section>
        <Section style={warningBanner}>
          <Text style={warningText}>⚠ Password Reset Request — Expires in 1 hour</Text>
        </Section>
        <Section style={content}>
          <Heading style={h1}>Reset Your Password</Heading>
          <Text style={text}>
            We received a request to reset the password for this account. If this was you, click below.
          </Text>
          <Button
            pX={20}
            pY={12}
            style={button}
            href={url}
          >
            Reset Password
          </Button>
          
          <Section style={noteBox}>
            <Heading as="h2" style={noteHeading}>If you didn't request this:</Heading>
            <Text style={noteText}>• Your account is still secure — no changes have been made</Text>
            <Text style={noteText}>• This link will expire automatically in 1 hour</Text>
            <Text style={noteText}>• Contact IT security if you're concerned: security@university.edu</Text>
          </Section>

          <Text style={fallbackText}>
            Or copy this URL into your browser:
          </Text>
          <Text style={urlText}>{url}</Text>
        </Section>
        <Section style={footer}>
          <Text style={footerText}>
            © 2026 University Research Management. This is an automated security email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#FAFAF8',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const header = {
  backgroundColor: '#1B2A4A',
  padding: '20px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#FFFFFF',
  fontSize: '24px',
  margin: '0',
};

const warningBanner = {
  backgroundColor: '#FFFBF0',
  borderBottom: '1px solid #C9A84C',
  padding: '10px',
  textAlign: 'center' as const,
};

const warningText = {
  color: '#7A5C00',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
};

const content = {
  backgroundColor: '#FFFFFF',
  padding: '40px',
};

const h1 = {
  color: '#1B2A4A',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const text = {
  color: '#4A4A4A',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#1B2A4A',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  margin: '30px auto',
};

const noteBox = {
  backgroundColor: '#F5F3EE',
  borderLeft: '4px solid #1B2A4A',
  padding: '16px',
  margin: '30px 0',
};

const noteHeading = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#1B2A4A',
  margin: '0 0 10px',
};

const noteText = {
  color: '#4A4A4A',
  fontSize: '13px',
  margin: '5px 0',
};

const fallbackText = {
  color: '#7A7A7A',
  fontSize: '12px',
  margin: '20px 0 5px',
  textAlign: 'center' as const,
};

const urlText = {
  color: '#1B2A4A',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0',
};

const footer = {
  padding: '20px 40px',
  backgroundColor: '#F5F3EE',
};

const footerText = {
  color: '#7A7A7A',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0',
};
