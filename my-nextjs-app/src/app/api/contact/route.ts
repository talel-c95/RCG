import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Debug: Check environment variables
    console.log("Email_COMPANY:", process.env.Email_COMPANY);
    console.log("COMPANY_EMAIL:", process.env.COMPANY_EMAIL);
    console.log("Email_PASS:", process.env.Email_PASS);
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.Email_COMPANY,
        pass: process.env.Email_PASS
      }
    });

    // Create a nice HTML email structure
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1F3A93, #4A90E2); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #1F3A93; }
          .field-label { font-weight: bold; color: #1F3A93; margin-bottom: 5px; }
          .field-value { color: #555; }
          .timestamp { text-align: center; color: #888; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Contact Form Submission</h1>
            <p>Someone has reached out through your website!</p>
          </div>
          
          <div class="content">
            <h2>📋 Contact Information</h2>
            ${Object.entries(formData).map(([key, value]) => `
              <div class="field">
                <div class="field-label">${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</div>
                <div class="field-value">${value || 'Not provided'}</div>
              </div>
            `).join('')}
            
            <div class="timestamp">
              📅 Submitted on: ${new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to company with all form data
    await transporter.sendMail({
      from: `"Rakhami Group Website" <${process.env.Email_COMPANY}>`,
      to: process.env.Email_COMPANY, // Send to yourself for now
      subject: '🚀 New Website Contact - Action Required!',
      html: htmlEmail,
      text: `New contact form submission received!\n\n${JSON.stringify(formData, null, 2)}\n\nSubmitted on: ${new Date().toLocaleString()}`,
      replyTo: formData.email || formData.userEmail || 'no-reply@example.com'
    });

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully!'
    });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
