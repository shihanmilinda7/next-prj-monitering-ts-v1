import { createSlice } from "@reduxjs/toolkit";

interface searchState {
  staffname: any;
  designation: any;
}

const initialState: searchState = {
  staffname: "",
  designation:"" ,
};

const searchSlice: any = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchStaffName: (state, action) => {
      state.staffname = action.payload;
    },
    setSearchDesignation: (state, action) => {
      state.designation = action.payload;
    },
  },
});

export const { setSearchStaffName,setSearchDesignation } = searchSlice.actions;

export default searchSlice.reducer;
