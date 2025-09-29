import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { SentMessageInfo } from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
    if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, subject, message } = req.body;
  const mailOptions = {
    from: email,
    to: process.env.GMAIL_EMAIL_ADDRESS,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_EMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info: SentMessageInfo = await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: `Message delivered to ${info.accepted.join(', ')}` });
  } catch (err: any) {
    console.error('SendMail Error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
