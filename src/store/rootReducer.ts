import { combineReducers } from "@reduxjs/toolkit";
import saveReducer from "./saveSlice";
import timeAllocDateReducer from "./timeAllocDateSlice";

const rootReducer = combineReducers({
  saveReducer,
  timeAllocDateReducer,
});

export default rootReducer;
