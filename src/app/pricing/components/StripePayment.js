"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import backend_api from "@/lib/api";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "@/redux/actions/orderActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const CheckoutForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profileDetail = useSelector((state) => state.userLogin);
  const { userInfo } = profileDetail;
  const getPriceById = useSelector((state) => state.pricingById);
  const { pricing } = getPriceById;
  const loaderOrder = useSelector((state) => state.updateOrder);
  const { loading } = loaderOrder;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createToken(elements.getElement(CardElement));

    if (result.error) {
      setError(result.error.message);
    } else {
      setError(null);
      setCardComplete(true);
      const { token } = JSON.parse(localStorage.getItem("userInfo"));

      const { data } = await axios.post(
        `${backend_api}/api/stripe_service_payment`,
        {
          amount: pricing.price * 100,
          token: result.token.id,
          description: `${userInfo.name} Bought ${pricing.licious} Licious.`,
          email: userInfo.email,
          name: userInfo.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data == "succeeded") {
        const liciouss = Number(pricing?.licious);
        dispatch(updateOrder(liciouss));
        toast.success(`${pricing?.licious} Licious Added`);
        router.push("/");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-2 p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="card-element"
        >
          Credit or debit card
        </label>
        <CardElement
          id="card-element"
          className="p-4 border border-gray-300 rounded-lg"
          onChange={(event) => {
            setError(event.error ? event.error.message : "");
            setCardComplete(event.complete);
          }}
        />
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      <button
        className="cursor-pointer bg-indigo-500 hover:bg-indigo-700 w-full text-white font-medium py-2 px-4 rounded-lg"
        disabled={!stripe || !cardComplete}
      >
        {loading ? <p>Payment Processing....</p> : <p>Pay With Card</p>}
      </button>
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51IoolWKZy2WF2k2RvBfHawRgDiD9jdmBS5tgWp2vxyaJk02PJkgaBO8rVCjjwL3XTzZPYSgxbu6aKWJpXnCrSJ55004xx6kZmA"
);

const Stripe = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Stripe;
