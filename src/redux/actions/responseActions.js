import backend_api from "@/lib/api";
import axios from "axios";
export const getResponses = () => async (dispatch) => {
  try {
    dispatch({
      type: "RESPONSE_GET_DATA_REQUEST",
    });
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.get(`${backend_api}/api/response`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "RESPONSE_GET_DATA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "RESPONSE_GET_DATA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateResponses = (texts, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "RESPONSE_UPDATE_DATA_REQUEST",
    });

    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.put(
      `${backend_api}/api/response/${id}`,
      {
        texts,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: "RESPONSE_UPDATE_DATA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "RESPONSE_UPDATE_DATA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
