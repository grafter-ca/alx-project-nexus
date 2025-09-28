import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Order from "@/models/Order";
import { verifyPayment } from "@/utils/chapa";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { reference, orderId } = req.query;

    if (!reference || !orderId) {
      return res.status(400).json({ message: "Payment reference and orderId required" });
    }

    // Verify with Chapa
    const verification = await verifyPayment(reference as string);

    if (verification.status === "success") {
      // Update order
      await Order.findByIdAndUpdate(orderId, {
        status: "paid",
        transactionId: reference,
      });

      // Redirect user to thank-you page
      return res.redirect(`/order/success?orderId=${orderId}`);
    } else {
      await Order.findByIdAndUpdate(orderId, { status: "failed" });
      return res.redirect(`/order/failed?orderId=${orderId}`);
    }
  } catch (error) {
    return res.status(500).json({ message: "Payment verification failed", error });
  }
}
