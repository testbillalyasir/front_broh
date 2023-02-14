"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "@/redux/actions/orderActions";
import Link from "next/link";
import { logouts } from "@/redux/actions/userActions";
const ProfileModal = ({ setShowProfileModal }) => {
  const orders = useSelector((state) => state.getOrder);
  const { order, loading, error } = orders;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);
  const logout = () => {
    dispatch(logouts());
  };
  return (
    <div className="min-h-screen z-[999999] bg-[#000000a8] fixed top-0 left-0 right-0 flex items-center content-center justify-center">
      <div>
        <button
          onClick={logout}
          className="absolute bottom-4 bg-black text-white py-2 px-3 rounded-md shadow-lg right-4"
        >
          Logout
        </button>
      </div>
      <div className="bg-white  mx-2 sm:mx-0 max-w-xs py-3 px-3 rounded-md w-full shadow-xl border-2">
        {loading ? (
          <p className="text-center">Loading....</p>
        ) : (
          <>
            {order?.map((info) => (
              <div key={info._id} className="relative">
                <p className="text-center font-bold">
                  Available Licious :{" "}
                  <span className="text-green-600">{info.licious}</span>
                </p>
                <Link href="/pricing" legacyBehavior>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="cursor-pointer bg-indigo-500 hover:bg-indigo-700 w-full mt-2 text-white font-medium py-2 px-4 rounded-lg"
                  >
                    Add More Licious
                  </button>
                </Link>

                <svg
                  onClick={() => setShowProfileModal(false)}
                  className="absolute top-[-9px] bg-black  rounded-full right-[-8px] cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    fill="#fff"
                  />
                </svg>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
