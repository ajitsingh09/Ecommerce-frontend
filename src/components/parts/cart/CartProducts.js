import { CartContext } from "@/components/context/CartContext";
import React, { useContext } from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const CartProducts = () => {
  const { cartProducts } = useContext(CartContext);
  return (
    <Box>
      <h2>Cart</h2>

      {!cartProducts.length && <h4>Your cart is empty</h4>}

      {cartProducts.length > 0 && <></>}
    </Box>
  );
};

export default CartProducts;
