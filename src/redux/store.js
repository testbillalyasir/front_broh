"use client";
/*
if (typeof window !== "undefined") {
  
}
*/
"use client";

import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";

import {
  userJoinReducer,
  userLoginReducer,
  userProfile,
  userResetPasswordEmailReducer,
  userPasswordUpdate,
} from "./reducers/UserReducers";

import { aiGetDataReducer } from "@/redux/reducers/userReducers";
import {
  stripeGetDataReducer,
  stripePostDataReducer,
} from "./reducers/stripeReducers";
import { orderGetReducer, orderUpdateReducer } from "./reducers/orderReducers";
import {
  responseGetReducer,
  responseUpdateReducer,
} from "./reducers/responseReducers";
const {
  pricingGetReducer,
  getPricingById,
} = require("./reducers/pricingReducers");
const reducres = combineReducers({
  userJoin: userJoinReducer,
  userLogin: userLoginReducer,
  profile: userProfile,
  aiDataGenerate: aiGetDataReducer,
  emailer: userResetPasswordEmailReducer,
  passwordUpdate: userPasswordUpdate,
  stripeData: stripeGetDataReducer,
  stripePostData: stripePostDataReducer,
  pricingData: pricingGetReducer,
  pricingById: getPricingById,
  getOrder: orderGetReducer,
  updateOrder: orderUpdateReducer,
  getResponse: responseGetReducer,
  updateResponse: responseUpdateReducer,
});

const middlewares = [thunk];
const store = createStore(reducres, applyMiddleware(...middlewares));

export default store;
