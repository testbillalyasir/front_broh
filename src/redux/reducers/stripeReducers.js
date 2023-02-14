export const stripeGetDataReducer = (state = { pricingData: [] }, action) => {
  switch (action.type) {
    case "STRIPE_GET_DATA_REQUEST":
      return { loading: true };
    case "STRIPE_GET_DATA_SUCCESS":
      return { loading: false, pricingData: action.payload };
    case "STRIPE_GET_DATA_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stripePostDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "STRIPE_POST_DATA_REQUEST":
      return { loading: true };
    case "STRIPE_POST_DATA_SUCCESS":
      return { loading: false, postData: action.payload };
    case "STRIPE_POST_DATA_FAIL;":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
