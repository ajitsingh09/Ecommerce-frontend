import { mongooseConnect } from "@/components/lib/mongoose";
import { Order } from "@/components/modals/order";
import { Product } from "@/components/modals/product";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(404).json("Resource Not Found");
  }

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  await mongooseConnect();

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId,
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "INR",
          product_data: { name: productInfo.name },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",

    customer_email: email,
    success_url:
      process.env.PUBLIC_URL +
      `/cart/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderDoc._id.toString()}`,
    cancel_url: process.env.PUBLIC_URL + "/cart/canceled",
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });

  res.json({
    url: session.url,
  });
}
