import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { Center } from "@/styles/component.style";
import { CartContext } from "@/components/context/CartContext";
import axios from "axios";
import Layout from "../components/ui/layout";
import PaymentOptions from "@/components/parts/cart/PaymentOptions";

const CartProducts = dynamic(
  () => import("../components/parts/cart/CartProducts"),
  {
    ssr: false,
  },
);

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Cart = () => {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        let res = await axios.post("/api/cart/", { ids: cartProducts });
        if (res?.data) setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCartDetails();
  }, [cartProducts]);
  return (
    <>
      <Layout>
        <Center>
          <ColumnsWrapper>
            <CartProducts products={products} />
            <PaymentOptions />
          </ColumnsWrapper>
        </Center>
      </Layout>
    </>
  );
};

export default Cart;
