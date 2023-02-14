import axios from "axios";
import backend_api from "@/lib/api";

export const getOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: "ORDER_GET_DATA_REQUEST",
    });
    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    const { data } = await axios.get(`${backend_api}/api/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "ORDER_GET_DATA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_GET_DATA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrder = (liciouss) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_UPDATE_DATA_REQUEST",
    });

    const {
      getOrder: { order },
    } = getState();
    let ids;
    let licious_token;
    order?.map((info) => {
      ids = info._id;
      licious_token = info.licious;
    });
    const licious = liciouss + licious_token;

    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    const { data } = await axios.put(
      `${backend_api}/api/orderId/${ids}`,
      {
        licious,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    dispatch({
      type: "ORDER_UPDATE_DATA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch({
      type: "ORDER_UPDATE_DATA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
