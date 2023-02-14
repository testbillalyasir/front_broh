"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { userUpdatePassword } from "@/redux/actions/userActions";
import toast from "react-hot-toast";
const ForgetPassword = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const token = pathname.split("/")[3];
  const dispatch = useDispatch();
  const passwordDetail = useSelector((state) => state.passwordUpdate);

  const { sentEmailForForgetPassword, error } = passwordDetail;
  const newPassword = async (e) => {
    e.preventDefault();
    setPassword("");
    dispatch(userUpdatePassword(password, token));
  };
  useEffect(() => {
    if (sentEmailForForgetPassword) {
      toast.success(sentEmailForForgetPassword);
      router.push("/login");
    }
    if (error) {
      toast.error(error);
    }
  }, [error, sentEmailForForgetPassword, router]);

  return (
    <div className="overflow-hidden min-h-screen">
      <div className="container m-auto mx-auto flex items-center justify-center min-h-screen">
        <div className=" bg-white py-4 border-2 shadow-lg drop-shadow-lg px-6">
          <p className="text-sm text-gray-500">Enter New Password</p>
          <form onSubmit={newPassword}>
            <input
              placeholder="Enter New Password"
              aria-label="new password"
              role="input"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-200  border-cyan-600 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
            <button
              role="button"
              aria-label="Join"
              className=" text-sm mt-2 font-semibold leading-none text-black focus:outline-none bg-[#fbcb3c] border rounded  py-4 w-full"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
