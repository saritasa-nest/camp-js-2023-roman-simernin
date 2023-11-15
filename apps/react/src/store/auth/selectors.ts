import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Select loading for authentication state.*/
export const selectIsAuthLoading = createSelector(
	(state: RootState) => state.auth.isLoading,
	isLoading => isLoading,
);
