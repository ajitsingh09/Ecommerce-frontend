import { Center } from "@/styles/component.style";
import React from "react";
import styled from "styled-components";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

const NewProducts = ({ product }) => {
  console.log("This are our products", product);
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={product} />
    </Center>
  );
};

export default NewProducts;
