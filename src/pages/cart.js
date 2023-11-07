import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { Center } from "@/styles/component.style";
import Button from "@/components/ui/Button";
import { CartContext } from "@/components/context/CartContext";
import axios from "axios";
import Layout from "../components/ui/layout";

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
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const Cart = () => {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        let res = await axios.post("/api/cart/", { ids: cartProducts });
        console.log(res);
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
            <CartProducts />
            {cartProducts.length > 0 && (
              <Box>
                <h2>Order Information</h2>

                <input type="text" placeholder="Name"></input>
                <input type="text" placeholder="Address"></input>
                <Button block black>
                  Continue to Payment
                </Button>
              </Box>
            )}
          </ColumnsWrapper>
        </Center>
      </Layout>
    </>
  );
};

export default Cart;
