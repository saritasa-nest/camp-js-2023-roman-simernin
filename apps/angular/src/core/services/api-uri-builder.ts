import { environment } from '@js-camp/angular/environments/environment';
import { Injectable } from '@angular/core';

/** Service for building uri for server endpoints.*/
@Injectable({
	providedIn: 'root',
})
export class ApiUriBuilder {
	private readonly apiUrl = environment.apiUrl;

	/** Build uri for search anime endpoint. */
	public buildGetAnimeListUri(): string {
		const path = 'anime/anime/';

		return this.buildAbsoluteUri(path);
	}

	private buildAbsoluteUri(path: string): string {
		return new URL(path, this.apiUrl).toString();
	}
}
