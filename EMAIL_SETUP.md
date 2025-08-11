# Email Setup Guide for Contact Form

Your contact form is now configured to send emails! Here's how to set it up:

## 🚀 Quick Setup (Recommended: Resend)

### 1. Sign up for Resend (Free tier: 3,000 emails/month)
- Go to [resend.com](https://resend.com)
- Sign up with your email
- Verify your account

### 2. Get your API key
- In Resend dashboard, go to "API Keys"
- Create a new API key
- Copy the key (starts with `re_`)

### 3. Add to Vercel Environment Variables
In your Vercel project dashboard:
```
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=austin@throughthenest.com
```

### 4. Vercel Deployment
Your site is hosted at: `through-the-nest.vercel.app`

**Current Setup:**
- Emails come from `onboarding@resend.dev` (Resend's verified domain)
- This works immediately without domain verification
- Recipients can reply directly to your clients

**Optional Domain Setup (Future):**
- If you get a custom domain (e.g., throughthenest.com), you can verify it in Resend
- This would allow emails to come from your domain instead of resend.dev

## 🔧 Alternative: Gmail SMTP Setup

If you prefer using Gmail:

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-factor authentication

### 2. Generate App Password
- Go to Google Account > Security > App passwords
- Generate a password for "Mail"
- Copy this 16-character password

### 3. Add to Vercel Environment Variables
```
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
CONTACT_EMAIL=austin@throughthenest.com
```

## 📧 How It Works

1. **User fills out contact form**
2. **Form submits to your Vercel serverless function**
3. **Email is sent to your specified address**
4. **User gets confirmation message**

## 🛠️ Features Included

- ✅ **Professional HTML email formatting**
- ✅ **Mobile-responsive email design**
- ✅ **Reply-to functionality** (you can reply directly to client)
- ✅ **Backup email service** (tries SMTP if primary fails)
- ✅ **Error handling** (form still works if email fails)
- ✅ **Detailed client information** in email

## 📝 Email Content Includes

- Client's full name and contact details
- Service they're interested in
- Event date (if provided)
- Their full message
- Timestamp of submission

## 🚨 Important Notes

- **Environment variables must be set in Vercel** for production
- **Test the form** after deploying to ensure emails are working
- **Check spam folder** initially as new domains may be filtered
- **Both email services work on Vercel's serverless functions**

## 🧪 Testing

1. Deploy to Vercel with environment variables set
2. Submit a test form
3. Check your email (and spam folder)
4. Verify the reply-to functionality works

Need help? The form includes detailed error logging to help troubleshoot any issues.