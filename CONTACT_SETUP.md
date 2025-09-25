# Contact Form Setup Guide

## Overview
The contact page includes a meeting scheduling system that allows users to book 30-minute meetings with your CEO between 9:00 AM and 4:00 PM.

## Features
- **Meeting Scheduling**: Users can select date and time slots
- **Industry Selection**: Dropdown with common industries
- **Email Notifications**: Both company and user receive confirmation emails
- **Form Validation**: Client and server-side validation
- **Responsive Design**: Mobile-friendly interface

## Setup Requirements

### 1. Install Dependencies
```bash
npm install nodemailer @types/nodemailer
```

### 2. Environment Variables
Create a `.env.local` file in your project root with:

```env
# Company email address (Gmail recommended for testing)
EMAIL_USER=your-company-email@gmail.com

# Email password or app password
EMAIL_PASS=your-app-password

# Company email where meeting requests will be sent
COMPANY_EMAIL=ceo@rkhamigroup.com
```

### 3. Gmail Setup (Recommended for testing)
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings → Security → App passwords
3. Generate a new app password for "Mail"
4. Use this app password in your `.env.local` file

### 4. Alternative Email Services
You can modify the transporter configuration in `/src/app/api/contact/route.ts`:

```typescript
// For Outlook/Hotmail
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// For custom SMTP
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## API Endpoints

### GET /api/contact
Returns available time slots for meetings.

### POST /api/contact
Accepts meeting request data:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "meetingDate": "2024-01-15",
  "meetingTime": "14:00",
  "industry": "Technology",
  "description": "Optional project description"
}
```

## Time Slots
Available meeting times are generated automatically:
- 9:00, 9:30, 10:00, 10:30, 11:00, 11:30
- 12:00, 12:30, 13:00, 13:30, 14:00, 14:30
- 15:00, 15:30, 16:00

## Customization

### Meeting Duration
Change the meeting duration by modifying the `generateTimeSlots` function in `/src/utils/meetingUtils.ts`.

### Business Hours
Adjust the business hours by modifying the loop in the `generateTimeSlots` function.

### Industries
Update the industries list in `/src/app/Contact/page.tsx`.

### Email Templates
Modify the email content in `/src/app/api/contact/route.ts`.

## Testing
1. Start your development server: `npm run dev`
2. Navigate to `/Contact`
3. Fill out the form and submit
4. Check your email for the meeting request
5. Check the user's email for confirmation

## Production Considerations
- Use a professional email service (SendGrid, Mailgun, etc.)
- Implement rate limiting for the API
- Add CAPTCHA or other spam prevention
- Set up email templates with your company branding
- Consider adding meeting conflict checking
- Implement calendar integration (Google Calendar, Outlook, etc.)

## Troubleshooting

### Common Issues
1. **Email not sending**: Check your email credentials and app passwords
2. **Gmail blocking**: Ensure you're using an app password, not your regular password
3. **Port issues**: Some networks block SMTP ports, consider using a service like SendGrid

### Debug Mode
Add console.log statements in the API route to debug email sending issues.

