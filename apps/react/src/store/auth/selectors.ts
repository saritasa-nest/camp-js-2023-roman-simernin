import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Select authentication state.*/
export const selectAuth = createSelector(
	(state: RootState) => state.auth,
	auth => auth,
);
