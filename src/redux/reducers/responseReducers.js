export const responseGetReducer = (state = { response: [] }, action) => {
  switch (action.type) {
    case "RESPONSE_GET_DATA_REQUEST":
      return { loading: true };
    case "RESPONSE_GET_DATA_SUCCESS":
      return { loading: false, response: action.payload };
    case "RESPONSE_GET_DATA_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const responseUpdateReducer = (state = { response: {} }, action) => {
  switch (action.type) {
    case "RESPONSE_UPDATE_DATA_REQUEST":
      return { loading: true };
    case "RESPONSE_UPDATE_DATA_SUCCESS":
      return { loading: false, response: action.payload };
    case "RESPONSE_UPDATE_DATA_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
