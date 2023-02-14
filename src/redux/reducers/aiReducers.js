export const aiGetDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "AI_DATA_REQUEST":
      return { loading: true };
    case "AI_DATA_SUCCESS":
      return { loading: false, aiData: action.payload };
    case "AI_DATA_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
