import { configureStore } from '@reduxjs/toolkit';
import saveReducer from './saveSlice';

const store = configureStore({
  reducer: {
    saveReducer,
  },
});

export default store;
