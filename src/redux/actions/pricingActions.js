import axios from "axios";
import backend_api from "@/lib/api";

export const getPricing = () => async (dispatch) => {
  try {
    dispatch({
      type: "PRICING_GET_DATA_REQUEST",
    });
    const { data } = await axios.get(`${backend_api}/api/pricing`);
    dispatch({
      type: "PRICING_GET_DATA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRICING_GET_DATA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getByIdPricing = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "PRICING_GET_ID_DATA_REQUEST",
    });
    const { data } = await axios.get(`${backend_api}/api/pricing/${id}`);
    dispatch({
      type: "PRICING_GET_ID_DATA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRICING_GET_ID_DATA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
