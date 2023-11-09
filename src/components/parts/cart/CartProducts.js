import { CartContext } from "@/components/context/CartContext";
import Button from "@/components/ui/Button";
import { Table } from "@/styles/component.style";
import React, { useContext } from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CartProducts = ({ products }) => {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  return (
    <Box>
      <h2>Cart</h2>

      {!cartProducts.length && <h4>Your cart is empty</h4>}

      {products?.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product?._id}>
                <ProductInfoCell>
                  <ProductImageBox>
                    <img src={product?.images[0]} alt="" />
                  </ProductImageBox>
                  {product?.name}
                </ProductInfoCell>
                <td>
                  <Button onClick={() => lessOfThisProduct(product?._id)}>
                    -
                  </Button>
                  <QuantityLabel>
                    {cartProducts.filter((id) => id === product?._id).length}
                  </QuantityLabel>
                  <Button onClick={() => moreOfThisProduct(product?._id)}>
                    +
                  </Button>
                </td>
                <td>
                  $
                  {cartProducts.filter((id) => id === product?._id).length *
                    product?.price}
                </td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td></td>
              <td>${total}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </Box>
  );
};

export default CartProducts;
