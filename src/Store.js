import { configureStore } from '@reduxjs/toolkit';
import { customerReducer } from './Additionals/customerSlice';

const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
});

export default store;