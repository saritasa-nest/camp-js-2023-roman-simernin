/** Query params for anime. */
export interface AnimeQueryParams {
    
    /** Page size. */
    readonly pageSize: number | undefined;

    /** Page number. */
	readonly pageNumber: number | undefined;

    /** Anime types. */
	readonly animeTypes: string | undefined;

    /** Search value. */
    readonly search: string | undefined;

    /** Sorting field. */
	readonly sortingField: string | undefined;

    /** Sorting direction (asc or desc). */
	readonly sortingDirection: string | undefined;
}