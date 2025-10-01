import { Contact } from 'lucide-react';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import dbConnect from '@/utils/mongodb';
import ContactModel, { IContact } from '@/models/Contact';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const Contact = ContactModel;
 
    if (req.method == 'POST') 
      {
 const { email, subject, message } = req.body;
  const mailOptions = {
    from: email,
    to: process.env.GMAIL_EMAIL_ADDRESS,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  };

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
  try {

    const info: SentMessageInfo = await transporter.sendMail(mailOptions);

    // Save contact to database
    const newContact = new Contact({ email, subject, message, status: 'new', Replyed: 'no' });

     // check if contact still exists so that we will set their status to in-progress
     const existingContact = await Contact.findOne({ email, subject, message });
     if (existingContact) {
       existingContact.status = 'in-progress';
       await existingContact.save();
     }

    await newContact.save();
    //reply to contact request
  try {
    const replyMailOptions = {
      from: process.env.GMAIL_EMAIL_ADDRESS,
      to: email,
      subject: 'Re: ' + subject,
      text: `Dear Customer,\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nBest regards,\nSupport Team`,
      html: `<p>Dear User,</p><p>Thank you for reaching out. We have received your message and will get back to you shortly.</p><p>Best regards,<br/>Support Team</p>`,
    };
    const replyInfo: SentMessageInfo = await transporter.sendMail(replyMailOptions);
    console.log(`Auto-reply sent to ${replyInfo.accepted.join(', ')}`);
    
    if (newContact.Replyed === 'no') {
      newContact.Replyed = 'yes';
      // update contact status in database
      await newContact.save();
    }
    // update contact status in database
    newContact.status = 'in-progress';
    await newContact.save();
    if (replyInfo.rejected.length > 0) {
      console.error(`Failed to send auto-reply to: ${replyInfo.rejected.join(', ')}`);
    }

    if(info.rejected.length > 0) {
      console.error(`Failed to deliver message to: ${info.rejected.join(', ')}`);
      return res.status(500).json({ error: 'Failed to deliver message' });
    }

   

  } catch (error) {
    
    console.error('Auto-reply Error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  } 

  // if status is closed, delete contact in db
    if (newContact.status === 'closed') {
      await Contact.deleteOne({ _id: newContact._id });
    }

    return res
      .status(200)
      .json({ success: `Message delivered to ${info.accepted.join(', ')}` });


  } catch (err: any) {
    console.error('SendMail Error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  } 
}

  if (req.method === 'GET') {
    // Handle GET request
   const contacts: IContact[] = await Contact.find().sort({ createdAt: -1 });
   const newContactsCount = await Contact.countDocuments({ createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) } });
    return res.status(200).json({ contacts, newContacts: newContactsCount });
  }

  else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

 
}
