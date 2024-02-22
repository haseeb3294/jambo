import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server'

export async function GET(request) {
    return NextResponse.json({ success: 'Working' }, { status: 200 })
}
export async function POST(request) {
    const {email,bookingNo,vehicle,schedule,startTime,endTime,bookingAmount,orderNumber,qrImg} = await request.json();

    // Create a nodemailer transporter
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
      subject:'Booking',
      html:`
      <div style="background-color: #d9d9d9;padding: 20px 0">
        <div style="background-color: #fefaf9;max-width: 600px;padding:10px;margin: auto">
            <div style="padding:0 30px">
                <div style="text-align: center">
                    <img src="https://cmjwebv2.cedrics.se/public/assets/images/cmj.png" alt="logo" width="120">
                </div>
                <div>
                    <img src="https://cmjwebv2.cedrics.se/public/assets/images/57.jpg" style="max-width: 100%;margin-top: 10px" alt="buggy">
                    <h2 style="text-align: center;font-family: 'Verdana', 'Arial', sans-serif">Your Booking has been Placed!</h2>
                    <table style="width: 100%;margin: 0 auto;font-family: 'Verdana', 'Arial', sans-serif">
                        <tr>
                            <td style="padding-bottom: 14px;width: 300px">
                                Booking Number:
                            </td>
                            <td style="padding-bottom: 14px;font-weight: 600">
                                ${bookingNo}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 14px">
                                Vehicle Details:
                            </td>
                            <td style="padding-bottom: 14px;font-weight: 600">
                                ${vehicle}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 14px">
                                Booking Schedule:
                            </td>
                            <td style="padding-bottom: 14px;font-weight: 600">
                                ${schedule}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 14px">
                                Timing:
                            </td>
                            <td style="padding-bottom: 14px;font-weight: 600">
                                ${startTime} To ${endTime}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 14px">
                                Amount:
                            </td>
                            <td style="padding-bottom: 14px;font-weight: 600">
                                AED ${bookingAmount}
                            </td>
                        </tr>
                    </table>
                    <p style="width: 75%;text-align: center;margin: 20px auto;font-family: 'Verdana', 'Arial', sans-serif">Thank you for your purchase! Now we're giving you the QR code with reference number. If you would like to cancel this booking, please let us know within 24 hours.</p>
                    <img src="https://cmjbuggy.com/public/qr/${qrImg}.png" width="150" height="150" alt="qr"/>
                    <p style="margin-bottom: 0;text-align: center;font-family: 'Verdana', 'Arial', sans-serif"><b>Order Number:</b></p>
                    <p style="margin-top: 0;text-align: center;font-family: 'Verdana', 'Arial', sans-serif"><b>${orderNumber}</b></p>
                    <div style="text-align:center">
                        <img src="https://cmjwebv2.cedrics.se/public/assets/images/apple-logo.png" style="object-fit: contain;margin-right: 12px" width="50" alt="">
                        <img src="https://cmjwebv2.cedrics.se/public/assets/images/android-logo.png" style="object-fit: contain" width="42" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
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