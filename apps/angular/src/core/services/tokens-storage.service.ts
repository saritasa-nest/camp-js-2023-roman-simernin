import { Injectable } from '@angular/core';
import { TokensModel } from '@js-camp/core/models/auth/tokens.model';

/** Tokens storage service. */
@Injectable({
	providedIn: 'root',
})
export class TokensStorageService {

	private readonly tokensKey = 'tokens';

	private tokens: TokensModel | null = null;

	/**
	 * Save tokens in storage.
	 * @param tokens Tokens.
	 */
	public save(tokens: TokensModel): void {
		this.tokens = tokens;
		localStorage.setItem(this.tokensKey, JSON.stringify(tokens));
	}

	/** Get data from localStorage. */
	public get(): TokensModel | null {
		if (this.tokens !== null) {
			return this.tokens;
		}

		const tokensAsJson = localStorage.getItem(this.tokensKey);

		if (tokensAsJson === null) {
			return null;
		}

		this.tokens = JSON.parse(tokensAsJson) as TokensModel;

		return this.tokens;
	}

	/** Delete tokens from storage. */
	public delete(): void {
		this.tokens = null;
		localStorage.removeItem(this.tokensKey);
	}
}
