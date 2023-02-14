import backend_api from "@/lib/api";
import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${backend_api}/api/login`,
      { email, password },
      config
    );
    console.log(data);
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logouts = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
  document.location.href = "/login";
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_REGISTER_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${backend_api}/api/signup`,
      { name, email, password },
      config
    );

    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userResetPasswordEmail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_RESET_PASSWORD_EMAIL_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${backend_api}/api/forgot`,
      {
        email,
      },
      config
    );
    dispatch({
      type: "USER_RESET_PASSWORD_EMAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_RESET_PASSWORD_EMAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_PROFILE_REQUEST",
    });
    const { token } = JSON.parse(localStorage.getItem("userInfo"));

    const { data } = await axios.get(`${backend_api}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "USER_PROFILE_SUCCESS",
      payload: data,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    if (!userInfo) {
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : null,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "USER_PROFILE_FAIL",
      payload: message,
    });
  }
};

export const userUpdatePassword = (password, token) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_RESET_PASSWORD_UPDATE_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${backend_api}/api/recoverypass`,
      {
        password,
      },
      config
    );
    dispatch({
      type: "USER_RESET_PASSWORD_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_RESET_PASSWORD_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
