export const orderGetReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case "ORDER_GET_DATA_REQUEST":
      return { loading: true };
    case "ORDER_GET_DATA_SUCCESS":
      return { loading: false, order: action.payload };
    case "ORDER_GET_DATA_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_UPDATE_DATA_REQUEST":
      return { loading: true };
    case "ORDER_UPDATE_DATA_SUCCESS":
      return { loading: false, order: action.payload };
    case "ORDER_UPDATE_DATA_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
