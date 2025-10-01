import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer, { SentMessageInfo } from "nodemailer";
import dbConnect from "@/utils/mongodb";
import ContactModel from "@/models/Contact";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { contactId, replyMessage } = req.body;

  await dbConnect();

  const contact = await ContactModel.findById(contactId);
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
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

    const replyMailOptions = {
      from: process.env.GMAIL_EMAIL_ADDRESS,
      to: contact.email,
      subject: "Re: " + contact.subject,
      text: replyMessage,
      html: `<p>${replyMessage}</p>`,
    };

    const replyInfo: SentMessageInfo = await transporter.sendMail(replyMailOptions);

    contact.Replyed = "yes";
    contact.status = "in-progress";
    await contact.save();

    return res.status(200).json({ success: "Reply sent", info: replyInfo });
  } catch (error) {
    console.error("Reply Error:", error);
    return res.status(500).json({ error: "Failed to send reply" });
  }
}
