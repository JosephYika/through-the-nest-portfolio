import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  service: string;
  eventDate?: string | null;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const { firstName, lastName, email, phone, service, eventDate, message } = data;
  
  // Email content
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
        New Contact Form Submission - Through The Nest
      </h2>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #555; margin-top: 0;">Client Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Service Requested:</strong> ${service}</p>
        ${eventDate ? `<p><strong>Event Date:</strong> ${eventDate}</p>` : ''}
      </div>
      
      <div style="background-color: #fff; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0;">
        <h3 style="color: #555; margin-top: 0;">Message</h3>
        <p style="line-height: 1.6; color: #666;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
        <p>This email was sent from the contact form on Through The Nest portfolio website.</p>
        <p>Sent on: ${new Date().toLocaleDateString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>
    </div>
  `;

  const textContent = `
New Contact Form Submission - Through The Nest

Client Information:
Name: ${firstName} ${lastName}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Service Requested: ${service}
${eventDate ? `Event Date: ${eventDate}` : ''}

Message:
${message}

Sent on: ${new Date().toLocaleDateString('en-GB')}
  `;

  try {
    const result = await resend.emails.send({
      from: 'Through The Nest <noreply@throughthenest.com>', // You'll need to verify this domain
      to: [process.env.CONTACT_EMAIL || 'austin@throughthenest.com'], // Your actual email
      subject: `New Contact Form: ${service} inquiry from ${firstName} ${lastName}`,
      html: htmlContent,
      text: textContent,
      replyTo: email, // Allow direct reply to the client
    });

    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send contact email');
  }
}

// Fallback email service using Nodemailer (for Gmail/other SMTP)
export async function sendContactEmailSMTP(data: ContactEmailData): Promise<void> {
  // Import nodemailer only if needed
  const nodemailer = await import('nodemailer');
  
  const transporter = nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
    },
  });

  const { firstName, lastName, email, phone, service, eventDate, message } = data;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
    subject: `New Contact Form: ${service} inquiry from ${firstName} ${lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Service:</strong> ${service}</p>
      ${eventDate ? `<p><strong>Event Date:</strong> ${eventDate}</p>` : ''}
      <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
    `,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent via SMTP successfully');
  } catch (error) {
    console.error('Failed to send email via SMTP:', error);
    throw new Error('Failed to send contact email via SMTP');
  }
}