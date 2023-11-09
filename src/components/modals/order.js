//here we will create our product Schema
import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: { type: Object },
    name: { type: String },
    email: { type: String },
    city: { type: String },
    postalCode: { type: String },
    streetAddress: { type: String },
    country: { type: String },
    paid: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

export const Order = models?.Order || model("Order", OrderSchema);
