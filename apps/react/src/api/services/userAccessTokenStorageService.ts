import { UserAccessToken } from '@js-camp/core/models/auth/user-access-token';

/** Tokens storage service. */
export namespace UserAccessTokenStorageService {

	const TOKENS_KEY = 'camp-access-token';

	/**
	 * Save tokens in storage.
	 * @param token Tokens.
	 */
	export function save(token: UserAccessToken): void {
		localStorage.setItem(TOKENS_KEY, JSON.stringify(token));
	}

	/** Get data from localStorage. */
	export function get(): UserAccessToken | null {
		const tokensAsJson = localStorage.getItem(TOKENS_KEY);

		if (tokensAsJson === null) {
			return null;
		}

		return JSON.parse(tokensAsJson) as UserAccessToken;
	}

	/** Delete tokens from storage. */
	export function remove(): void {
		localStorage.removeItem(TOKENS_KEY);
	}
}
