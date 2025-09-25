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

    // Create a professional HTML email structure
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission - Rkhami Group</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f5f5f5;
          }
          .container { 
            max-width: 650px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 8px; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header { 
            background: #1a365d; 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 24px; 
            font-weight: 600; 
            letter-spacing: 0.5px;
          }
          .header p { 
            margin: 10px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9; 
          }
          .content { 
            padding: 40px 30px; 
          }
          .section-title { 
            font-size: 18px; 
            font-weight: 600; 
            color: #1a365d; 
            margin: 0 0 25px 0; 
            padding-bottom: 10px; 
            border-bottom: 2px solid #e2e8f0; 
          }
          .field { 
            background: #f8fafc; 
            padding: 20px; 
            margin: 15px 0; 
            border-radius: 6px; 
            border-left: 4px solid #3182ce; 
            border: 1px solid #e2e8f0;
          }
          .field-label { 
            font-weight: 600; 
            color: #2d3748; 
            margin-bottom: 8px; 
            font-size: 14px; 
            text-transform: uppercase; 
            letter-spacing: 0.5px;
          }
          .field-value { 
            color: #4a5568; 
            font-size: 16px; 
            word-break: break-word;
          }
          .field-value a { 
            color: #3182ce; 
            text-decoration: none; 
          }
          .field-value a:hover { 
            text-decoration: underline; 
          }
          .footer { 
            background: #f7fafc; 
            padding: 25px 30px; 
            text-align: center; 
            border-top: 1px solid #e2e8f0; 
          }
          .timestamp { 
            color: #718096; 
            font-size: 14px; 
            margin: 0;
          }
          .company-info {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            color: #718096;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Rkhami Group Website Inquiry</p>
          </div>
          
          <div class="content">
            <h2 class="section-title">Contact Information</h2>
            ${Object.entries(formData).map(([key, value]) => `
              <div class="field">
                <div class="field-label">${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</div>
                <div class="field-value">${key === 'email' ? `<a href="mailto:${value}">${value}</a>` : (value || 'Not provided')}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="footer">
            <div class="timestamp">
              Submitted on: ${new Date().toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </div>
            <div class="company-info">
              Rkhami Consulting Group<br>
              Immeuble Carthage Palace, Bloc A, 5ème Etage App. A51<br>
              Centre Urbain Nord, 1082 Tunis, Tunisie
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to company with all form data
    await transporter.sendMail({
      from: `"Rkhami Group Website" <${process.env.Email_COMPANY}>`,
      to: process.env.Email_COMPANY, // Send to yourself for now
      subject: `New Contact Form Submission - ${formData.name || 'Unknown Contact'} (${formData.industry || 'No Industry'})`,
      html: htmlEmail,
      text: `New contact form submission received from ${formData.name || 'Unknown Contact'}.\n\nContact Details:\n${Object.entries(formData).map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value || 'Not provided'}`).join('\n')}\n\nSubmitted on: ${new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
      })}`,
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
