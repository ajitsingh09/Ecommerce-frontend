import { mongooseConnect } from "@/components/lib/mongoose";
import { Product } from "@/components/models/product";
import Header from "@/components/nav/Header";
import Featured from "@/components/parts/home/Featured";
import NewProducts from "@/components/parts/home/NewProducts";
import styled from "styled-components";

const Container = styled.div`
  padding-bottom: 35px;
`;

export default function Home({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <Container>
        <NewProducts product={newProducts} />
      </Container>
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "65224a8f5183d7ce1fcbb182";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
