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

	private readonly genreBasePath = 'anime/genres';

	private readonly studioBasePath = 'anime/studios';

	/**
	 * Provide url is from api.
	 * @param url - URL.
	 * */
	public isApiUrl(url: string): boolean {
		return url.startsWith(this.apiUrl);
	}

	/** Build uri for search anime endpoint. */
	public buildGetAnimeListUri(): string {
		return this.buildAnimeUri('');
	}

	/**
	 * Build uri for getting anime by id endpoint.
	 * @param id - Anime id.
	 * */
	public buildGetAnimeByIdUri(id: number): string {
		return this.buildAnimeUri(`${id}/`);
	}

	/** Build uri for creation endpoint. */
	public buildCreateAnimeUri(): string {
		return this.buildAnimeUri('');
	}

	/**
	 * Build uri for anime editing endpoint.
	 * @param id - Anime id.
	 */
	public buildEditAnimeUri(id: number): string {
		return this.buildAnimeUri(`${id}/`);
	}

	/**
	 * Build uri for anime deleting by id endpoint.
	 * @param id - Anime id.
	 */
	public buildDeleteAnimeUri(id: number): string {
		return this.buildAnimeUri(`${id}/`);
	}

	/** Build uri for search genre endpoint. */
	public buildGetGenreListUri(): string {
		return this.buildGenreUri('');
	}

	/** Build uri for creation genre endpoint. */
	public buildCreateGenreUri(): string {
		return this.buildGenreUri('');
	}

	/** Build uri for search studio endpoint. */
	public buildGetStudioListUri(): string {
		return this.buildStudioUri('');
	}

	/** Build uri for creation studio endpoint. */
	public buildCreateStudioUri(): string {
		return this.buildStudioUri('');
	}

	/** Build uri for login endpoint. */
	public buildLoginUri(): string {
		return this.buildAuthUri('login/');
	}

	/** Build uri for registration endpoint. */
	public buildRegistrationUri(): string {
		return this.buildAuthUri('register/');
	}

	/** Build uri for resfresh endpoint. */
	public buildRefreshUri(): string {
		return this.buildAuthUri('token/refresh/');
	}

	/**
	 * Provide uri is for authentication.
	 * @param uri - Uri.
	 * */
	public isAuthUri(uri: string): boolean {
		return uri.startsWith(this.authBasePath);
	}

	/** Build uri for getting s3 parameters. */
	public buildS3ParamsUri(): string {
		return this.buildAbsoluteUri('s3direct', 'get_params/');
	}

	private buildAuthUri(path: string): string {
		return this.buildAbsoluteUri(this.authBasePath, path);
	}

	private buildAnimeUri(path: string): string {
		return this.buildAbsoluteUri(this.animeBasePath, path);
	}

	private buildGenreUri(path: string): string {
		return this.buildAbsoluteUri(this.genreBasePath, path);
	}

	private buildStudioUri(path: string): string {
		return this.buildAbsoluteUri(this.studioBasePath, path);
	}

	private buildAbsoluteUri(basePath: string, path: string): string {
		return new URL(`${basePath}/${path}`, this.apiUrl).toString();
	}
}
