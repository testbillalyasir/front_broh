"use client";
import { getPricing } from "@/redux/actions/pricingActions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import toast from "react-hot-toast";
const Pricing = () => {
  const dispatch = useDispatch();
  const pricingDetail = useSelector((state) => state.pricingData);

  const { pricing: tiers, loading, error } = pricingDetail;

  useEffect(() => {
    dispatch(getPricing());
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error]);

  return (
    <div className="bg-white ">
      <div className="max-w-7xl xl:mt-20 mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
            Pricing Plans
          </h1>
          <hr className="mt-6" />
        </div>
        {loading ? (
          <div className="mt-12 flex items-start justify-center content-center">
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
        ) : (
          <div className="mt-12  space-y-4 sm:mt-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
            {tiers?.map((tier) => (
              <div
                key={tier._id}
                className="border  border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200"
              >
                <div className="p-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    {tier.licious} {tier.name}
                  </h2>
                  <p className="mt-2">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${tier.price}
                    </span>{" "}
                  </p>

                  <Link href={`/pricing/${tier._id}`} legacyBehavior>
                    <a className="cursor-pointer mt-4 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900">
                      Choose Your Licious
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
