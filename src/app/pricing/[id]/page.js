"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByIdPricing } from "@/redux/actions/pricingActions";
import StripePayment from "../components/StripePayment";
import { useRouter } from "next/navigation";
import PaypalPayment from "../components/PaypalPayment";
import toast from "react-hot-toast";
import Link from "next/link";
const PricingById = ({ params }) => {
  const router = useRouter();
  const id = params.id;
  const dispatch = useDispatch();
  const getPriceById = useSelector((state) => state.pricingById);
  const { pricing, error, loading } = getPriceById;
  const userProfile = useSelector((state) => state.userLogin);
  const { userInfo } = userProfile;
  useEffect(() => {
    dispatch(getByIdPricing(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const [payment, setPayment] = useState("paypal");

  return (
    <div className="min-h-screen flex items-center content-center justify-center">
      <div className="bg-white fle items-center content-center shadow-lg max-w-sm w-full rounded-md">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="border  border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200">
            <div className="p-6">
              <h2 className="text-lg text-center leading-6 font-medium text-gray-900">
                {pricing?.licious} {pricing?.name}
              </h2>
              <p className="mt-2 text-center bg-black py-4 px-4 max-w-[115px] m-auto rounded-full">
                <span className="text-4xl font-extrabold text-gray-100">
                  ${pricing?.price}
                </span>{" "}
              </p>
              <div className="flex m-auto text-center gap-8 max-w-[60%] sm:max-w-[50%]">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-red-500"
                      defaultChecked
                      onChange={(e) => setPayment(e.target.value)}
                      value="paypal"
                    />
                    <span className="label-text font-semibold ml-2">
                      Paypal
                    </span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                      value="stripe"
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    <span className="label-text font-semibold ml-2">
                      Stripe
                    </span>
                  </label>
                </div>
              </div>
              {!userInfo ? (
                <>
                  <Link href="/signup" legacyBehavior>
                    <button className="cursor-pointer mt-4 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900">
                      Please SignUp/Login To Checkout
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  {payment === "paypal" ? <PaypalPayment /> : <StripePayment />}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingById;
