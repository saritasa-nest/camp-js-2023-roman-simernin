import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Select loading for authentication.*/
export const selectIsAuthLoading = createSelector(
	(state: RootState) => state.auth.isLoading,
	isLoading => isLoading,
);

/** Select authentication state.*/
export const selectIsAuthenticated = createSelector(
	(state: RootState) => state.auth.isAuthenticated,
	isAuthenticated => isAuthenticated,
);

/** Select authentication error.*/
export const selectAuthError = createSelector(
	(state: RootState) => state.auth.error,
	error => error,
);
