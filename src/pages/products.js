import { mongooseConnect } from "@/components/lib/mongoose";
import { Product } from "@/components/models/product";
import ProductsGrid from "@/components/parts/home/ProductsGrid";
import Layout from "@/components/ui/layout";
import { Center, Title } from "@/styles/component.style";
import React from "react";

const Products = ({ products }) => {
  return (
    <Layout>
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </Layout>
  );
};

export default Products;

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
