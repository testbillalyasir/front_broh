"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/actions/userActions";

const Join = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userLogin);
  const { userInfo } = data;
  const join = useSelector((state) => state.userJoin);
  const { error } = join;
  const createAccount = async (e) => {
    e.preventDefault();

    if (name == "") {
      toast.error("Please Enter Your Name.");
    } else if (email == "") {
      toast.error("Please Enter Your Email.");
    } else if (password === null) {
      toast.error("Please Enter Your Password.");
    } else {
      dispatch(register(name, email, password));
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
    if (error) {
      toast.error(error);
    }
  }, [userInfo, router, error]);
  return (
    <div className="sm:min-h-screen overflow-hidden bg-gradient-to-tl  w-full pb-16 px-4">
      <div className="flex mt-20 flex-col items-center justify-center">
        <div className="bg-white border drop-shadow-lg shadow-lg rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-6">
          <p
            tabIndex={0}
            className="text-2xl font-extrabold leading-6 text-gray-800"
          >
            Create An Account
          </p>

          <p className="text-sm mt-4 font-medium leading-none text-gray-500">
            Already have account?{" "}
            <Link href="/login" legacyBehavior>
              <span
                tabIndex={0}
                role="link"
                className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
              >
                {" "}
                Login here
              </span>
            </Link>
          </p>
          <br />
          <form onSubmit={createAccount}>
            <div className="mt-3  w-full">
              <p className="text-sm font-medium leading-none text-gray-800">
                Name
              </p>
              <input
                onChange={(e) => setName(e.target.value)}
                role="input"
                type="text"
                placeholder="Enter Your Name"
                className="bg-gray-200 border rounded outline-none  font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            <div className="mt-3  w-full">
              <p className="text-sm font-medium leading-none text-gray-800">
                Email
              </p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                role="input"
                type="email"
                className="bg-gray-200 border rounded outline-none  font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
            </div>
            <div className="mt-3  w-full">
              <p className="text-sm font-medium leading-none text-gray-800">
                Password
              </p>
              <div className="relative flex items-center justify-center">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  role="input"
                  type={showPassword}
                  placeholder="Enter Password"
                  className="bg-gray-200 border rounded outline-none  font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                  {showPassword === "password" ? (
                    <svg
                      onClick={() => setShowPassword("text")}
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="#222"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                        fill="#71717A"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShowPassword("password")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-slash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                role="button"
                className=" text-sm font-semibold leading-none text-black focus:outline-none bg-[#fbcb3c] border rounded  py-4 w-full"
              >
                Create my account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;
