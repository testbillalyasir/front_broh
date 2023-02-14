export const pricingGetReducer = (state = { pricing: [] }, action) => {
  switch (action.type) {
    case "PRICING_GET_DATA_REQUEST":
      return { loading: true };
    case "PRICING_GET_DATA_SUCCESS":
      return { loading: false, pricing: action.payload };
    case "PRICING_GET_DATA_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getPricingById = (state = {}, action) => {
  switch (action.type) {
    case "PRICING_GET_ID_DATA_REQUEST":
      return { loading: true };
    case "PRICING_GET_ID_DATA_SUCCESS":
      return { loading: false, pricing: action.payload };
    case "PRICING_GET_ID_DATA_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
