import { Login } from '@js-camp/core/models/auth/login';
import { AuthService } from '@js-camp/react/api/services/authService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
	'auth/login',
	async(loginModel: Login, { rejectWithValue }) => {
		try {
			return await AuthService.login(loginModel);
		} catch (error: unknown) {
			return rejectWithValue(error);
		}
	},
);

export const logout = createAsyncThunk(
	'auth/logout',
	() => AuthService.logout(),
);
