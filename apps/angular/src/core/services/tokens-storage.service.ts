import { Injectable } from '@angular/core';
import { TokensModel } from '@js-camp/core/models/auth/tokens.model';

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
	public save(tokens: TokensModel): void {
		localStorage.setItem(this.tokensKey, JSON.stringify(tokens));
	}

	/** Get data from localStorage. */
	public get(): TokensModel | null {
		const tokensAsJson = localStorage.getItem(this.tokensKey);

		if (tokensAsJson === null) {
			return null;
		}

		return JSON.parse(tokensAsJson) as TokensModel;
	}

	/** Delete tokens from storage. */
	public delete(): void {
		localStorage.removeItem(this.tokensKey);
	}
}
