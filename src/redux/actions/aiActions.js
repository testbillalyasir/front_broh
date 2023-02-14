import axios from "axios";
import backend_api from "@/lib/api";
export const aiData = (question) => async (dispatch) => {
  try {
    dispatch({
      type: "AI_DATA_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${backend_api}/api/gpt`,
      { question },
      config
    );

    dispatch({
      type: "AI_DATA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "AI_DATA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
