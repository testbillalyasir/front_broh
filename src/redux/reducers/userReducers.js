export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userJoinReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userProfile = (state = {}, action) => {
  switch (action.type) {
    case "USER_PROFILE_REQUEST":
      return { loading: true };
    case "USER_PROFILE_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_PROFILE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userResetPasswordEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_RESET_PASSWORD_EMAIL_REQUEST":
      return { loading: true };
    case "USER_RESET_PASSWORD_EMAIL_SUCCESS":
      return { loading: false, sentEmailForForgetPassword: action.payload };
    case "USER_RESET_PASSWORD_EMAIL_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userPasswordUpdate = (state = {}, action) => {
  switch (action.type) {
    case "USER_RESET_PASSWORD_UPDATE_REQUEST":
      return { loading: true };
    case "USER_RESET_PASSWORD_UPDATE_SUCCESS":
      return { loading: false, sentEmailForForgetPassword: action.payload };
    case "USER_RESET_PASSWORD_UPDATE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
