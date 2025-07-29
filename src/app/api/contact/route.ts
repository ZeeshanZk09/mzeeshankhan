import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_PASS, EMAIL_USER } from '@/lib/constants';

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: EMAIL_USER,
    subject: `New message from ${name} (${email})`,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
