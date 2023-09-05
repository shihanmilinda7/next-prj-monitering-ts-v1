import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectAssignSavedState {
  projectAssignSaveState: boolean;
}

const initialState: ProjectAssignSavedState = {
  projectAssignSaveState: true,
};

const projectAssignSaveSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    setProjectAssignSaved: (state) => {
      state.projectAssignSaveState = true;
    },
    setProjectAssignUnsaved: (state) => {
      state.projectAssignSaveState = false;
    },
  },
});

export const { setProjectAssignSaved, setProjectAssignUnsaved } = projectAssignSaveSlice.actions;

export default projectAssignSaveSlice.reducer;
