// src/app/api/send-email/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email } = await req.json(); // Get data from request body

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASS, // App-specific password
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email, // Recipient's email address (from the form)
    subject: "Form Submission Successful",
    text: `Hi ${name},\n\nThank you for submitting your form. We'll get back to you soon.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
