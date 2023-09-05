import { Injectable } from '@angular/core';
import { Tokens } from '@js-camp/core/models/auth/tokens';

/** Tokens storage service. */
@Injectable({
	providedIn: 'root',
})
export class TokensStorageService {

	private readonly tokensKey = 'tokens';

	/**
	 * Save tokens in storage.
	 * @param tokens Tokens.
	 */
	public save(tokens: Tokens): void {
		localStorage.setItem(this.tokensKey, JSON.stringify(tokens));
	}

	/** Get data from localStorage. */
	public get(): Tokens | null {
		const tokensAsJson = localStorage.getItem(this.tokensKey);

		if (tokensAsJson === null) {
			return null;
		}

		return JSON.parse(tokensAsJson) as Tokens;
	}

	/** Delete tokens from storage. */
	public delete(): void {
		localStorage.removeItem(this.tokensKey);
	}
}
