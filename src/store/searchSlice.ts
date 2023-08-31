import { createSlice } from "@reduxjs/toolkit";

interface searchState {
  staffname: any;
  projectname: any;
  designation: any;
}

const initialState: searchState = {
  staffname: "",
  designation:"" ,
  projectname:"",
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
    setSearchProjectName: (state, action) => {
      state.projectname = action.payload;
    },
  },
});

export const { setSearchStaffName,setSearchDesignation,setSearchProjectName } = searchSlice.actions;

export default searchSlice.reducer;
