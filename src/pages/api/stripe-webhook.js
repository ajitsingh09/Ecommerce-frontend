import { buffer } from "micro";
import { mongooseConnect } from "@/components/lib/mongoose";
import { Order } from "@/components/modals/order";
const stripe = require("stripe")(process.env.STRIPE_SK);

const endpointSecret =
  "whsec_847f458c9eefc1a6316e5bcba649d324e4ddf1bd3c427521aa49ea120eb3e3f7";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret,
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      console.log(data);
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false }, //disables body parser
};

//boom-classy-glow-heroic
//acct_1NPLCPSCFioyCFqd
//whsec_847f458c9eefc1a6316e5bcba649d324e4ddf1bd3c427521aa49ea120eb3e3f7
