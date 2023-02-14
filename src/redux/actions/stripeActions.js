import axios from "axios";
import backend_api from "@/lib/api";

export const stripeGetData = () => async (dispatch) => {
  try {
    dispatch({
      type: "STRIPE_GET_DATA_REQUEST",
    });
    const { data } = await axios.get(`${backend_api}/api/stripe/subscription`);
    dispatch({
      type: "STRIPE_GET_DATA_SUCCESS",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "STRIPE_GET_DATA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const stripePostDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "STRIPE_POST_DATA_REQUEST",
    });
    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    const { data } = await axios.post(
      `${backend_api}/api/stripe/subscription`,
      { test: "test" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "STRIPE_POST_DATA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "STRIPE_POST_DATA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
