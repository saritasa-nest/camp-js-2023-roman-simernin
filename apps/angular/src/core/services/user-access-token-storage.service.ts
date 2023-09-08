import { Injectable } from '@angular/core';
import { UserAccessToken } from '@js-camp/core/models/auth/user-access-token';

/** Tokens storage service. */
@Injectable({
	providedIn: 'root',
})
export class UserAccessTokenStorageService {

	private readonly tokensKey = 'camp-access-token';

	/**
	 * Save tokens in storage.
	 * @param token Tokens.
	 */
	public save(token: UserAccessToken): void {
		localStorage.setItem(this.tokensKey, JSON.stringify(token));
	}

	/** Get data from localStorage. */
	public get(): UserAccessToken | null {
		const tokensAsJson = localStorage.getItem(this.tokensKey);

		if (tokensAsJson === null) {
			return null;
		}

		return JSON.parse(tokensAsJson) as UserAccessToken;
	}

	/** Delete tokens from storage. */
	public delete(): void {
		localStorage.removeItem(this.tokensKey);
	}
}
