import { environment } from '@js-camp/angular/environments/environment';
import { Injectable } from '@angular/core';

/** Service for building uri for server endpoints.*/
@Injectable({
	providedIn: 'root',
})
export class ApiUriBuilder {
	private readonly apiUrl = environment.apiUrl;

	private readonly authBasePath = 'auth';

	private readonly animeBasePath = 'anime/anime';

	/** Build uri for search anime endpoint. */
	public buildGetAnimeListUri(): string {
		return this.buildAnimeBasePath('');
	}

	/**
	 * Build uri for getting anime by id endpoint.
	 * @param id - Anime id.
	 * */
	public buildGetAnimeByIdUri(id: number): string {
		return this.buildAnimeBasePath(`${id}/`);
	}

	/** Build uri for login endpoint. */
	public buildLoginUri(): string {
		return this.buildAuthBasePath('login/');
	}

	/** Build uri for registration endpoint. */
	public buildRegistrationUri(): string {
		return this.buildAuthBasePath('register/');
	}

	/** Build uri for resfresh endpoint. */
	public buildRefreshUri(): string {
		return this.buildAuthBasePath('token/refresh/');
	}

	/**
	 * Provide uri is for authentication.
	 * @param uri - Uri.
	 * */
	public isAuthUri(uri: string): boolean {
		return uri.startsWith(this.authBasePath);
	}

	private buildAuthBasePath(path: string): string {
		return this.buildAbsoluteUri(`${this.authBasePath}/${path}`);
	}

	private buildAnimeBasePath(path: string): string {
		return this.buildAbsoluteUri(`${this.animeBasePath}/${path}`);
	}

	private buildAbsoluteUri(path: string): string {
		return new URL(path, this.apiUrl).toString();
	}
}
