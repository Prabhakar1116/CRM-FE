import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCustomers } from '../Services/Api';

export const fetchAllCustomers = createAsyncThunk('customers/fetchAll', async (token) => {
  const response = await fetchCustomers(token);
  return response.data;
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const customerReducer = customerSlice.reducer;
