import { CartContext } from "@/components/context/CartContext";
import Layout from "@/components/ui/layout";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 80vw;
  display: flex;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  line-height: 20px;
`;

const DeatailBox = styled.div`
  width: 80%;
  background-color: #d1cfcf;
  font-size: 16px;
  border-radius: 6px;
  margin-top: 40px;
  padding: 20px;
  display: inline-flex;
  flex-wrap: wrap;
  word-break: break-all;
`;

const Subheading = styled.h4`
  margin: 0px;
`;

const Success = () => {
  const router = useRouter();
  const { clearCart } = useContext(CartContext);

  const [orderID, setOrderId] = useState("");
  console.log(router.query);
  useEffect(() => {
    if (router.query?.orderId) {
      setOrderId(router.query.orderId);
      clearCart();
    }
  }, [router.query?.orderId]);

  console.log(router.query);
  return (
    <Layout>
      <Box>
        <h2> Order Successful </h2>
        <Subheading>
          Your Payment has been successful. We will let you know the delivery
          information
        </Subheading>
        <DeatailBox>
          Order Id : &nbsp; <b>{orderID}</b>
        </DeatailBox>
      </Box>
    </Layout>
  );
};

export default Success;
