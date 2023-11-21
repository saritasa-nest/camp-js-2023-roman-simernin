import { createSlice } from '@reduxjs/toolkit';
import { AuthService } from '@js-camp/react/api/services/authService';

import { login, logout } from './dispatchers';
import { AuthState } from './state';

const initialState: AuthState = {
	isLoading: false,
	isAuthenticated: AuthService.isAuthenticated(),
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(login.pending, state => {
			state.isLoading = true;
			state.isAuthenticated = AuthService.isAuthenticated();
		})
		.addCase(login.fulfilled, state => {
			state.isLoading = false;
			state.isAuthenticated = AuthService.isAuthenticated();
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
