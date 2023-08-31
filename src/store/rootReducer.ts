import { combineReducers } from "@reduxjs/toolkit";
import saveReducer from "./saveSlice";
import timeAllocDateReducer from "./timeAllocDateSlice";
import yearMonthPickerReducer from "./year-month-pickerSlice";
import searchReducer from "./searchSlice";

const rootReducer = combineReducers({
  saveReducer,
  timeAllocDateReducer,
  yearMonthPickerReducer,
  searchReducer,
});

export default rootReducer;
