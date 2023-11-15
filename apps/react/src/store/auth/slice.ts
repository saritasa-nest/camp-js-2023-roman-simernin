import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import { login } from './dispatchers';

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(login.pending, state => {
			state.isLoading = true;
		})
		.addCase(login.fulfilled, state => {
			state.isLoading = false;
		}),
});
