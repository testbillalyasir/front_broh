"use client";
import React, { useState, useEffect, useRef } from "react";
import Logo from "../../../public/images/logo.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getOrder } from "@/redux/actions/orderActions";
import Link from "next/link";
const ChatBuble = ({ message, input }) => {
  const dispatch = useDispatch();

  const [greet, setGreet] = useState("");
  useEffect(() => {
    const greetingList = [
      "Command Me Anything That I can Answer.",
      "I Am Here To Help You!",
      "Make Your Productivity More Faster With Me.",
      "I Will Try To Solve Your Any Problem Just Command Me.",
      "Welcome! I Am Here To Answer Your Command.",
    ];
    const randomGreeting =
      greetingList[Math.floor(Math.random() * greetingList.length)];
    setGreet(randomGreeting);
  }, []);
  const userDetails = useSelector((state) => state.userLogin);
  const { userInfo } = userDetails;
  const chatDetail = useSelector((state) => state.aiDataGenerate);
  const { error, loading } = chatDetail;
  const profile = useSelector((state) => state.profile);
  const { user, loading: load } = profile;
  const orderDetail = useSelector((state) => state.getOrder);
  const [subs, setSubs] = useState(null);
  const { order } = orderDetail;

  useEffect(() => {
    order?.map((info) => {
      setSubs(info.licious);
    });
  }, [order, subs]);
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);
  const bottomRef = useRef(null);
  const msg = message.map((info) => info.message);
  useEffect(() => {
    if (!input) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msg, input]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <div>
      <div className="px-2 mt-[80px] sm:mt-14 chat chat-start">
        <div className="hidden sm:flex chat-image avatar">
          <div className=" hidden sm:flex w-10 rounded-full">
            <Image
              className=" hidden sm:flex"
              src={Logo.src}
              width={100}
              height={100}
              alt="logo"
            />
          </div>
        </div>
        <div className="chat-bubble font-bold  bg-[#ffce3d]  text-black dark:bg-[#222] dark:text-white w-auto max-w-full">
          Hi{" "}
          <span className="text-[#222]">{userInfo ? userInfo.name : ""}</span>,{" "}
          {greet && greet}
        </div>
      </div>

      {message.map((info, index) => (
        <div key={info.id}>
          {info.user === "me" && (
            <div key={info.id} className="chat chat-end">
              <div className="hidden sm:flex chat-image avatar placeholder">
                <div className=" hidden sm:flex bg-black  text-neutral-content rounded-full w-8">
                  <span className="text-xs">ME</span>
                </div>
              </div>
              <div className="chat-bubble max-w-full w-auto dark:bg-gray-500 dark:text-white bg-blue-500">
                {info.message}
              </div>
            </div>
          )}
          {index === message.length - 1 && loading ? (
            <div className="px-2 chat chat-start">
              <div className="hidden sm:flex chat-image avatar">
                <div className=" hidden sm:flex w-10 rounded-full">
                  <Image
                    className=" hidden sm:flex"
                    src={Logo.src}
                    width={100}
                    height={100}
                    alt="logo"
                  />
                </div>
              </div>
              <div className="chat-bubble bg-gray-100  text-black dark:bg-[#222] dark:text-white w-auto max-w-full">
                <div className="animate relative">
                  <div className="my message">
                    <span className="jumping-dots">
                      <span className="dot-1"></span>
                      <span className="dot-2"></span>
                      <span className="dot-3"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {info.message === undefined ? (
                ""
              ) : (
                <div>
                  {info.user === "gpt" && (
                    <div className="px-2 chat chat-start">
                      <div className="hidden sm:flex chat-image avatar">
                        <div className=" hidden sm:flex w-10 rounded-full">
                          <Image
                            className=" hidden sm:flex"
                            src={Logo.src}
                            width={100}
                            height={100}
                            alt="logo"
                          />
                        </div>
                      </div>
                      <div className="chat-bubble bg-gray-100  text-black dark:bg-[#222] dark:text-white w-auto max-w-full">
                        {!user ? (
                          <>
                            {info.message.split(" ").slice(0, 110).join(" ")}
                            {info.message.length >= 110 && (
                              <Link href="/pricing" legacyBehavior>
                                <a className="ml-2 cursor-pointer text-red-500 font-semibold underline">
                                  Insufficient Licious To Access More
                                </a>
                              </Link>
                            )}
                          </>
                        ) : (
                          <>
                            {subs <= 2 &&
                              info.message.split(" ").slice(0, 110).join(" ")}
                            {subs <= 2 && info.message.length >= 110 && (
                              <Link href="/pricing" legacyBehavior>
                                <a className="ml-2 cursor-pointer text-red-500 font-semibold underline">
                                  Insufficient Licious To Access More
                                </a>
                              </Link>
                            )}
                            {subs > 2 && (
                              <p className=" whitespace-pre-wrap ">
                                {info.message}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBuble;
