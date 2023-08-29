import { combineReducers } from "@reduxjs/toolkit";
import saveReducer from "./saveSlice";
import timeAllocDateReducer from "./timeAllocDateSlice";
import yearMonthPickerReducer from "./year-month-pickerSlice";

const rootReducer = combineReducers({
  saveReducer,
  timeAllocDateReducer,
  yearMonthPickerReducer,
});

export default rootReducer;
