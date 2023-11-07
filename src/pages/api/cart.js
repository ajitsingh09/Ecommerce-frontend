import { mongooseConnect } from "@/components/lib/mongoose";
import { Product } from "@/components/modals/product";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body?.ids;
  const result = await Product.find({ _id: ids });
  res.json(result);
}
