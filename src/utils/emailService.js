const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {
  GMAIL_USER,
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  GMAIL_REDIRECT_URI,
} = require("../configs/email.js");

// Create OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

// Send email for new referral
const sendReferralEmail = async (referral) => {
  try {
    // Get access token
    const accessToken = await oAuth2Client.getAccessToken();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_USER,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // Email to referred person
    const referredMailOptions = {
      from: `"Referral Program" <${GMAIL_USER}>`,
      to: referral.referredEmail,
      subject: `${referral.referrerName} has referred you to our service!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2>Hello ${referral.referredName},</h2>
          <p>${referral.referrerName} (${referral.referrerEmail}) thinks you might benefit from our services and has referred you to us.</p>
          <p>Here's what they said about you:</p>
          <div style="background-color: #f8f8f8; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0;">
            "${referral.message}"
          </div>
          <p>We'd love to connect with you and discuss how we can help. Please feel free to contact us or visit our website for more information.</p>
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://yourwebsite.com" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Visit Our Website</a>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #777;">If you believe this email was sent to you by mistake, please ignore it.</p>
        </div>
      `,
    };

    // Email to referrer (confirmation)
    const referrerMailOptions = {
      from: `"Referral Program" <${GMAIL_USER}>`,
      to: referral.referrerEmail,
      subject: "Thank you for your referral!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2>Thank you, ${referral.referrerName}!</h2>
          <p>We've received your referral for ${referral.referredName} and have sent them an invitation to connect with us.</p>
          <p>We appreciate you sharing our services with others who might benefit from them.</p>
          <p>As a token of our appreciation, we'll keep you updated on the status of your referral.</p>
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://yourwebsite.com/referral-program" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Refer More Friends</a>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(referredMailOptions);
    await transporter.sendMail(referrerMailOptions);

    // Update referral status
    await Referrals.findByIdAndUpdate(referral._id, { emailSent: true });

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send referral emails");
  }
};

module.exports = { sendReferralEmail };
