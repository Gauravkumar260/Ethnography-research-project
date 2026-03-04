import { Resend } from 'resend';
import { render } from '@react-email/render';
import pino from 'pino';

const logger = pino();
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  template: any; // React element
}

export async function sendEmail({ to, subject, template }: SendEmailOptions) {
  if (process.env.NODE_ENV === 'test') {
    logger.info({ to, subject }, 'Mock email sent in test environment');
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    logger.warn('RESEND_API_KEY not set. Skipping email send.');
    return;
  }

  try {
    const html = await render(template);
    
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@university.edu',
      to,
      subject,
      html,
    });

    if (error) {
      logger.error({ error, to, subject }, 'Failed to send email via Resend');
      return;
    }

    logger.info({ data, to, subject }, 'Email sent successfully');
  } catch (err) {
    logger.error({ err, to, subject }, 'Error rendering or sending email');
  }
}
