import { Login } from '@js-camp/core/models/auth/login';
import { Registration } from '@js-camp/core/models/auth/registration';
import { AuthService } from '@js-camp/react/api/services/authService';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

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

export const register = createAsyncThunk(
	'auth/register',
	async(registrationModel: Registration, { rejectWithValue }) => {
		try {
			return await AuthService.register(registrationModel);
		} catch (error: unknown) {
			return rejectWithValue(error);
		}
	},
);

export const logout = createAsyncThunk(
	'auth/logout',
	() => AuthService.logout(),
);

export const resetAuthError = createAction('auth/reset-error');
