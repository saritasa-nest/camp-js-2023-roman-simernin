import { environment } from '@js-camp/angular/environments/environment';

//* Service for building uri for server endpoints.*/
export class ApiUriBuilder {
    private readonly apiUrl = environment.apiUrl;

    //* Build uri for search anime endpoint. */
    public buildSearchAnimeUri(): string {
        const path: string = 'anime/anime';

        return this.buildAbsoluteUri(path);
    }

    private buildAbsoluteUri(path: string): string {
        return new URL(path, this.apiUrl).toString();
    }
}