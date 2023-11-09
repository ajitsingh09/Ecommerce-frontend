import { CartContext } from "@/components/context/CartContext";
import Button from "@/components/ui/Button";
import { Input } from "@/styles/component.style";
import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const PaymentOptions = () => {
  const { cartProducts } = useContext(CartContext);

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    email: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    country: "",
  });

  async function goToPayment(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/checkout", {
        ...orderInfo,
        cartProducts,
      });
      if (response?.data?.url) {
        window.location = response.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setOrderInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <Box>
        <h2>Order information</h2>
        <form onSubmit={goToPayment}>
          <Input
            type="text"
            placeholder="Name"
            value={orderInfo.name}
            name="name"
            required
            onChange={handleChange}
            disabled={cartProducts.length < 1}
          />
          <Input
            type="text"
            placeholder="Email"
            value={orderInfo.email}
            name="email"
            required
            onChange={handleChange}
            disabled={cartProducts.length < 1}
          />
          <CityHolder>
            <Input
              type="text"
              placeholder="City"
              value={orderInfo.city}
              name="city"
              required
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Postal Code"
              value={orderInfo.postalCode}
              name="postalCode"
              required
              onChange={handleChange}
            />
          </CityHolder>
          <Input
            type="text"
            placeholder="Street Address"
            value={orderInfo.streetAddress}
            name="streetAddress"
            required
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Country"
            value={orderInfo.country}
            name="country"
            required
            onChange={handleChange}
          />
          <Button black block type="submit" disabled={cartProducts.length < 1}>
            Continue to payment
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default PaymentOptions;
