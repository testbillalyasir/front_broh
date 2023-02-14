"use client";
import React, { useState, useEffect } from "react";
import ChatBuble from "./ChatBuble";
import { useDispatch, useSelector } from "react-redux";
import { aiData } from "@/redux/actions/aiActions";
import { getResponses, updateResponses } from "@/redux/actions/responseActions";
const ChatForm = () => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userLogin);
  const { userInfo } = userDetail;
  const responsesDetail = useSelector((state) => state.getResponse);
  const { response } = responsesDetail;
  const chatDetail = useSelector((state) => state.aiDataGenerate);
  const data_main = chatDetail?.aiData;

  useEffect(() => {
    setChatLog([
      ...chatLog,
      { user: "gpt", message: data_main?.txt, id: Math.random() },
    ]);
  }, [data_main]);

  const question = input;
  const sendRequest = async (e) => {
    e.preventDefault();
    dispatch(aiData(question));
    setInput("");
    let chatLogNew = [
      ...chatLog,
      { user: "me", message: `${input}`, id: Math.random() },
    ];
    setChatLog(chatLogNew);
    if (data_main?.txt && userInfo) {
      response?.forEach((info) => {
        dispatch(updateResponses(data_main?.txt, info._id));
      });
    }
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(getResponses());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="max-w-3xl  overflow-hidden bg-white m-auto items-center justify-center min-h-screen relative">
      <div>
        <div className="sm:h-[85vh]   sm:overflow-y-auto">
          <ChatBuble message={chatLog} input={input} />

          <div className="sm:hidden">
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <form onSubmit={sendRequest}>
          <div className="fixed sm:absolute bottom-0  flex items-center content-center justify-center w-full">
            <input
              type="search"
              className="w-full py-4 sm:py-6 sm:px-3 px-1 bg-gray-200 border border-gray-400  text-base text-gray-700 focus:outline-none focus:shadow-outline max-w-2xl sm:max-w-80 md:max-w-64 lg:max-w-64 "
              placeholder="Write Command....."
              onChange={(e) => setInput(e.target.value)}
              required
              value={input}
            />
            <button>
              <div className="border border-gray-400 py-2 sm:py-4 px-2 bg-[#fccb13]">
                <svg
                  width={40}
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <style
                      dangerouslySetInnerHTML={{
                        __html: ".cls-1{fill:#101820;}",
                      }}
                    />
                  </defs>
                  <title />
                  <g data-name="Layer 45" id="Layer_45">
                    <path
                      className="cls-1"
                      d="M19.47,31a2,2,0,0,1-1.8-1.09l-4-7.57a1,1,0,0,1,1.77-.93l4,7.57L29,3.06,3,12.49l9.8,5.26,8.32-8.32a1,1,0,0,1,1.42,1.42l-8.85,8.84a1,1,0,0,1-1.17.18L2.09,14.33a2,2,0,0,1,.25-3.72L28.25,1.13a2,2,0,0,1,2.62,2.62L21.39,29.66A2,2,0,0,1,19.61,31Z"
                    />
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatForm;
