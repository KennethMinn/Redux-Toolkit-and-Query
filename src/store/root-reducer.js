import { combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/counter-reducer";
import { apiSlice } from "../api/apiSlice";

export const rootReducer = combineReducers({
  counter: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
