import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server'

export async function GET(request) {
    return NextResponse.json({ success: 'Working' }, { status: 200 })
}
export async function POST(request) {
    const {email} = await request.json();

    // const {name, email, subject, message } = req.body;
    // // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP host
      port: 587, // Port
      secure: false, // false for TLS - as a boolean not string - if you use port 587 or 25
      auth: {
        user: 'cedricinfo@cedricfitness.com', // SMTP username
        pass: 'CS=<Zm86hUqF5yJ&&', // SMTP password
      },
    });

    const mailOptions = {
      from: 'CMJ <noreply@cedricfitness.com>', 
      to:email,
      subject:'Welcome to CMJ',
      html:`
      <h5>Hi</h5>
      <h5>Welcome aboard! 🎉</h5>
      <p>We're thrilled to have you join CMJ. You've taken the first step towards unlocking a world of opportunities.</p>
      <p>Get ready to explore, connect, and create with our platform. Whether you're here to learn, share, or discover, we've got something exciting in store for you.</p>
      <p>Thanks again for choosing CMJ. We can't wait to see what you accomplish!</p>
      <p><b>Best regards</b></p>
      `
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
    }
    

}