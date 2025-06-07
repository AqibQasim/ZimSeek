// src/app/api/send-email/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email } = await req.json(); // Get data from request body

  // Create a transporter object using SMTP transport
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.GMAIL_USER, // Your Gmail address
  //     pass: process.env.GMAIL_PASS, // App-specific password
  //   },
  // });

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: process.env.GODADDY_USER,
      pass: process.env.GODADDY_PASS, // use the actual email account password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: GODADDY_USER,
    to: email, // Recipient's email address (from the form)
    subject:
      "🎉 Welcome to ZimSeek – Your 3-Month Free Seller Access Has Begun!",
    text: `Dear ${name},

Welcome to ZimSeek – Zimbabwe’s first AI-powered marketplace connecting sellers like you to buyers seeking the best deals in town via WhatsApp, Web, and Voice! 🚀

We’re excited to have you on board and are pleased to offer you an exclusive 3-month free trial to showcase your products and grow your customer base.

🔍 Why ZimSeek?
✅ Reach More Customers: We use AI to match you with active buyers looking for exactly what you sell.
✅ Smart Discovery: Your listings will be accessible via WhatsApp, web, and more – giving you maximum visibility.
✅ Simplified Communication: Buyers can contact you directly via WhatsApp with one click.
✅ Affordable Pricing: After your free trial, continue growing for only $5 per product listing/month.

🛒 What’s Next?
We'll review and activate your listing shortly. Once live, potential buyers will start seeing your product when they search on ZimSeek.

Feel free to reply to this email if you have any questions or updates to your listing.

Welcome to the future of local trade in Zimbabwe.

Warm regards,  
The ZimSeek Team  
📱 WhatsApp: +263 XXX XXX XXX  
🌐 www.zimseek.co.zw  
✉️ support@zimseek.co.zw`,
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
