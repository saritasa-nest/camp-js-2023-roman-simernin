/** Auth state. */
export interface AuthState {

	/** Auth is loading. */
	readonly isLoading: boolean;
}

export const initialState: AuthState = {
	isLoading: false,
};
