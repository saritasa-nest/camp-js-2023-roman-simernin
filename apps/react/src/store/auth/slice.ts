import { createSlice } from '@reduxjs/toolkit';
import { AuthService } from '@js-camp/react/api/services/authService';
import { AppError } from '@js-camp/core/models/app-error';

import { login, logout } from './dispatchers';
import { AuthState } from './state';

const initialState: AuthState = {
	isLoading: false,
	isAuthenticated: AuthService.isAuthenticated(),
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(login.pending, state => {
			state.isLoading = true;
			state.isAuthenticated = AuthService.isAuthenticated();
			state.error = null;
		})
		.addCase(login.fulfilled, state => {
			state.isLoading = false;
			state.isAuthenticated = AuthService.isAuthenticated();
			state.error = null;
		})
		.addCase(login.rejected, (state, action) => {
			state.isLoading = false;
			state.isAuthenticated = AuthService.isAuthenticated();

			if (action.payload instanceof AppError) {
				state.error = action.payload;
			}
		})
		.addCase(logout.pending, state => {
			state.isLoading = true;
			state.isAuthenticated = AuthService.isAuthenticated();
		})
		.addCase(logout.fulfilled, state => {
			state.isLoading = false;
			state.isAuthenticated = AuthService.isAuthenticated();
		}),
});
