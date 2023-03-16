import React, { useState, useEffect } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MkQnUGTjtsWOkxuNPj9DfbesLA92BIsWHPyD6FpP72r58c1sRgo7TAmsVTeWM9qxNBsv5d3WBA79YlN6E6dNZaP003I6VFMxo"
);

const pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payement-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
        console.log(res.data.clientSecret);
      } catch (error) {}
    };
    return () => {
      makeRequest();
    };
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default pay;
