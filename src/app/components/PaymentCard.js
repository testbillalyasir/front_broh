"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stripeGetData } from "@/redux/actions/stripeActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MoneySvg from "./MoneySvg";
import { stripePostDataAction } from "@/redux/actions/stripeActions";
import Link from "next/link";
const PaymentCard = ({ setShowUpgardeModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.stripeData);
  const { error, loading, pricingData } = detail;
  const profile = useSelector((state) => state.profile);
  const { user } = profile;

  const stripePostDatas = useSelector((state) => state.stripePostData);

  const {
    postData,
    error: errorForPost,
    loading: loaderForPost,
  } = stripePostDatas;

  useEffect(() => {
    dispatch(stripeGetData());

    if (error) {
      toast.error(error);
    }

    if (errorForPost) {
      toast.error(errorForPost);
    }
  }, [dispatch, error, errorForPost, router]);

  useEffect(() => {
    dispatch(stripePostDataAction());
    if (errorForPost) {
      toast.error(errorForPost);
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      router.push("/signup");
      setShowUpgardeModal(false);
    }
  }, [errorForPost, dispatch, router, setShowUpgardeModal]);
  const checkOutPage = () => {
    if (!user) {
      router.push("/signup");
    }
  };

  return (
    <div className="min-h-screen top-0 left-0 right-0 z-[999999] fixed w-full h-full bg-[#0000008c] flex items-center content-center justify-center">
      {loading ? (
        <>
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          </div>
        </>
      ) : (
        <>
          {pricingData?.map((info) => (
            <div className="mx-2 sm:mx-0" key={info.nickname}>
              <div className="bg-white rounded-lg  w-full px-3 py-4 max-w-lg sm:m-auto relative">
                <div
                  onClick={() => setShowUpgardeModal(false)}
                  className=" py-2 cursor-pointer bg-black  w-[35px] absolute top-[-15px] rounded-full right-[-6px] m-auto text-center px-2"
                >
                  <svg
                    className="text-center"
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fff"
                      d="M443.6 387.1L312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 66.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L19.4 387.1c-5.4 5.4-5.4 14.2 0 19.6l37.4 37.6c2.6 2.6 6.1 4 9.8 4 3.7 0 7.2-1.5 9.8-4L256 313.1l130.7 131.1c2.6 2.6 6.1 4 9.8 4 3.7 0 7.2-1.5 9.8-4l37.4-37.6c5.4-5.4 5.4-14.2 0-19.6z"
                    />
                  </svg>
                </div>
                <p className="font-bold font-sans">{info.nickname}</p>
                <hr className="mt-1 mb-1" />
                <div className="blix">
                  <div className="flex">
                    <svg
                      width={20}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#1DA1F2"
                        d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                      />
                    </svg>{" "}
                    <span className="font-semibold">Access Everything.</span>
                  </div>
                  <div className="price flex uppercase font-semibold mt-1">
                    <MoneySvg />
                    <span className="ml-1">
                      Charge : ${info.unit_amount / 100}
                    </span>
                  </div>

                  {loaderForPost ? (
                    <button
                      onClick={checkOutPage}
                      className="w-full mt-2 bg-[#ffce3d] py-2 font-semibold rounded-sm uppercase"
                    >
                      {" "}
                      <p>Loading....</p>
                    </button>
                  ) : (
                    <Link href={postData.url} legacyBehavior>
                      <a
                        onClick={() => setShowUpgardeModal(false)}
                        className="w-full mt-2 block text-center bg-[#ffce3d] py-2 font-semibold rounded-sm uppercase"
                      >
                        Buy Plan Today{" "}
                      </a>
                    </Link>
                  )}

                  <div></div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PaymentCard;
