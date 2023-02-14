"use client";
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateOrder } from "@/redux/actions/orderActions";
import toast from "react-hot-toast";
import { getOrder } from "@/redux/actions/orderActions";
const PaypalPayment = () => {
  const getPriceById = useSelector((state) => state.pricingById);
  const { pricing } = getPriceById;
  const dispatch = useDispatch();
  const router = useRouter();

  const initialOptions = {
    "client-id":
      "AQE7lcO0zbNX8r-88ly3axm4qpg1ftOvW_CqjVsEdpDHYi5QsJG7a5w2iQb3_7SSiMu3zbFzWNq8yNGh",
    currency: "USD",
  };

  const approvePayment = (data, actions) => {
    return actions.order.capture().then((details) => {
      if (details.status == "COMPLETED") {
        const liciouss = Number(pricing?.licious);

        dispatch(updateOrder(liciouss));
        toast.success(`${pricing?.licious} Licious Added`);
        router.push("/");
      }
    });
  };

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <div className="mt-5 z-0 relative">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: "vertical",
            shape: "rect",
            height: 40,
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: 5,
                  },
                },
              ],
            });
          }}
          onApprove={approvePayment}
          onCancel={(data) => {
            console.log("payment cancel", data);
          }}
          onError={(err) => {
            toast.error("Paypal Payment Closed.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalPayment;
