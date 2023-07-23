/** DTO of anime airing for preview. */
export interface AnimeAiringPreviewDto {

    /** Start date. */
    readonly start: string;

    /** End date. */
    readonly end: string;
}

/** DTO of anime for preview. */
export interface AnimePreviewDto {

    /** Identifier. */
    readonly id: number;

    /** Creation date. */
    readonly created: string;

    /** Modification date. */
    readonly modified: string;

    /** Title in English. */
    readonly title_eng: string;

    /** Title in Japanese */
    readonly title_jpn: string;

    /** Image URL. */
    readonly image: string;

    /** Start and end dates for airing. */
    readonly aired: AnimeAiringPreviewDto;

    /** Type. */
    readonly type: string;

    /** Status. */
    readonly status: string;

    /** General anime rating. */
    readonly score: number;

    /** Amine rating specified by the user. */
    readonly user_score: number;
}