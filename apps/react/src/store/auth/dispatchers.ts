import { Login } from '@js-camp/core/models/auth/login';
import { AuthService } from '@js-camp/react/api/services/authService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
	'auth/login',
	(loginModel: Login) => AuthService.login(loginModel),
);

export const logout = createAsyncThunk(
	'auth/logout',
	() => AuthService.logout(),
);
