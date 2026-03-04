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

interface VerifyEmailTemplateProps {
  url: string;
}

export const VerifyEmailTemplate = ({ url }: VerifyEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Verify your university research portal account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>University Portal</Heading>
        </Section>
        <Section style={content}>
          <Heading style={h1}>Verify Your Email Address</Heading>
          <Text style={text}>
            You're almost ready. Click the button below to verify your institutional email and activate your account.
          </Text>
          <Button
            style={button}
            href={url}
          >
            Verify Email Address
          </Button>
          <Section style={noteBox}>
            <Text style={noteText}>
              This link expires in 24 hours. If you didn't create this account, you can safely ignore this email.
            </Text>
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
  padding: '12px 20px',
};

const noteBox = {
  backgroundColor: '#F5F3EE',
  borderLeft: '4px solid #1B2A4A',
  padding: '16px',
  margin: '30px 0',
};

const noteText = {
  color: '#4A4A4A',
  fontSize: '14px',
  margin: '0',
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
