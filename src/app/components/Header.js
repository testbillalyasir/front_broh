"use client";
import React, { useEffect, useState } from "react";
import PremiumIcon from "./PremiumIcon";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { userProfile } from "@/redux/actions/userActions";
import ProfileModal from "./ProfileModal";
import { getOrder } from "@/redux/actions/orderActions";
const Header = ({ params }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userDetails = useSelector((state) => state.userLogin);
  const { userInfo } = userDetails;
  const profile = useSelector((state) => state.profile);
  const { loading: load } = profile;
  const orders = useSelector((state) => state.getOrder);
  const { order, loading, error } = orders;
  let licious;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 2) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {showProfileModal === true ? (
        <ProfileModal setShowProfileModal={setShowProfileModal} />
      ) : null}
      <nav
        className={`px-2 sm:px-4 py-2.5 ${
          scrolled ? "bg-gray-800" : "bg-none"
        } fixed w-full z-20 top-0 left-0`}
      >
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <Image src={Logo.src} width={80} height={80} alt="Licious-Logo" />
          </Link>
          <div className="flex gap-7 sm:gap-5 md:order-2">
            {load ? (
              <button
                className="uppercase flex font-bold mt-[7px]"
                type="button"
              >
                <PremiumIcon />{" "}
                <span
                  className={`mt-[3px] ml-[5px] ${
                    scrolled ? "text-white" : "text-black"
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </span>
              </button>
            ) : (
              <>
                {!userInfo ? (
                  <>
                    <Link href="/pricing">
                      <button
                        className="uppercase z-50 flex font-bold mt-[7px]"
                        type="button"
                      >
                        <PremiumIcon />

                        <span
                          className={`mt-[3px] ml-[5px] ${
                            scrolled ? "text-white" : "text-black"
                          }`}
                        >
                          Upgrade
                        </span>
                      </button>
                    </Link>
                  </>
                ) : null}
                {order?.map((info) =>
                  info.licious > 2 ? null : (
                    <Link key={info.licious} href="/pricing">
                      <button
                        className="uppercase z-50 flex font-bold mt-[7px]"
                        type="button"
                      >
                        <PremiumIcon />

                        <span
                          className={`mt-[3px] ml-[5px] ${
                            scrolled ? "text-white" : "text-black"
                          }`}
                        >
                          Upgrade
                        </span>
                      </button>
                    </Link>
                  )
                )}
              </>
            )}

            {load ? (
              <>
                <button className="text-black uppercase font-bold bg-[#fccb13] outline-none   rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </button>
              </>
            ) : (
              <>
                {userInfo ? (
                  <button
                    onClick={userInfo ? () => setShowProfileModal(true) : null}
                    type="button"
                    className="text-black uppercase font-bold bg-[#fccb13] outline-none   rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                  >
                    {userInfo.name.split(" ")[0]}
                  </button>
                ) : (
                  <Link href="/signup" legacyBehavior>
                    <button className="text-black uppercase font-bold bg-[#fccb13] outline-none   rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
                      Sign Up
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
