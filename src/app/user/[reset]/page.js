"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userResetPasswordEmail } from "@/redux/actions/userActions";
import toast from "react-hot-toast";

const SendResetEmail = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const emailDetail = useSelector((state) => state.emailer);
  const { sentEmailForForgetPassword, loading, error } = emailDetail;

  const forgetpass = async (e) => {
    e.preventDefault();
    setEmail("");
    if (email === "") {
      toast.error("Please Enter Your Email Address.");
    } else {
      dispatch(userResetPasswordEmail(email));
    }
  };

  useEffect(() => {
    if (sentEmailForForgetPassword) {
      toast.success(sentEmailForForgetPassword);
    }
    if (error) {
      toast.error(error);
    }
  }, [error, sentEmailForForgetPassword]);

  return (
    <div className="min-h-screen">
      <div className="container m-auto mx-auto flex items-center justify-center min-h-screen">
        <div className=" bg-white py-4 border-2 shadow-lg drop-shadow-lg px-6">
          <p className="text-sm text-gray-500">Email Address</p>
          <form onSubmit={forgetpass}>
            <input
              placeholder="john@domain.com"
              aria-label="enter email adress"
              role="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-200  border-cyan-600 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
            <button
              role="button"
              aria-label="Join"
              className=" text-sm mt-2 font-semibold leading-none text-black focus:outline-none bg-[#fbcb3c] border rounded  py-4 w-full"
            >
              Send Password Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendResetEmail;
