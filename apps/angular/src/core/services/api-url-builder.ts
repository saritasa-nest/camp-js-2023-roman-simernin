import { environment } from '@js-camp/angular/environments/environment';
import { Injectable } from '@angular/core';

/** Service for building url for server endpoints.*/
@Injectable({
	providedIn: 'root',
})
export class ApiUrlBuilder {
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

	/** Build url for search anime endpoint. */
	public buildGetAnimeListUrl(): string {
		return this.buildAnimeUrl('');
	}

	/**
	 * Build url for getting anime by id endpoint.
	 * @param id - Anime id.
	 * */
	public buildGetAnimeByIdUrl(id: number): string {
		return this.buildAnimeUrl(`${id}/`);
	}

	/** Build url for creation endpoint. */
	public buildCreateAnimeUrl(): string {
		return this.buildAnimeUrl('');
	}

	/**
	 * Build url for anime editing endpoint.
	 * @param id - Anime id.
	 */
	public buildEditAnimeUrl(id: number): string {
		return this.buildAnimeUrl(`${id}/`);
	}

	/**
	 * Build url for anime deleting by id endpoint.
	 * @param id - Anime id.
	 */
	public buildDeleteAnimeUrl(id: number): string {
		return this.buildAnimeUrl(`${id}/`);
	}

	/** Build url for search genre endpoint. */
	public buildGetGenreListUrl(): string {
		return this.buildGenreUrl('');
	}

	/** Build url for creation genre endpoint. */
	public buildCreateGenreUrl(): string {
		return this.buildGenreUrl('');
	}

	/** Build url for search studio endpoint. */
	public buildGetStudioListUrl(): string {
		return this.buildStudioUrl('');
	}

	/** Build url for creation studio endpoint. */
	public buildCreateStudioUrl(): string {
		return this.buildStudioUrl('');
	}

	/** Build url for login endpoint. */
	public buildLoginUrl(): string {
		return this.buildAuthUrl('login/');
	}

	/** Build url for registration endpoint. */
	public buildRegistrationUrl(): string {
		return this.buildAuthUrl('register/');
	}

	/** Build url for resfresh endpoint. */
	public buildRefreshUrl(): string {
		return this.buildAuthUrl('token/refresh/');
	}

	/**
	 * Provide url is for authentication.
	 * @param url - Url.
	 * */
	public isAuthUrl(url: string): boolean {
		return url.startsWith(this.authBasePath);
	}

	/** Build url for getting s3 parameters. */
	public buildS3ParamsUrl(): string {
		return this.buildAbsoluteUrl('s3direct', 'get_params/');
	}

	private buildAuthUrl(path: string): string {
		return this.buildAbsoluteUrl(this.authBasePath, path);
	}

	private buildAnimeUrl(path: string): string {
		return this.buildAbsoluteUrl(this.animeBasePath, path);
	}

	private buildGenreUrl(path: string): string {
		return this.buildAbsoluteUrl(this.genreBasePath, path);
	}

	private buildStudioUrl(path: string): string {
		return this.buildAbsoluteUrl(this.studioBasePath, path);
	}

	private buildAbsoluteUrl(basePath: string, path: string): string {
		return new URL(`${basePath}/${path}`, this.apiUrl).toString();
	}
}
