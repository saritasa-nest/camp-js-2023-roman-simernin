//* Provides anime preview model constructor data. */
export interface AnimePreviewConstructorData {
    /** Identifier. */
    readonly id: number;

    /** Image URL. */
    readonly imageUrl: string;

    /** Title in English. */
    readonly englishTitle: string;

    /** Title in Japanese */
    readonly japanTitle: string;

    /** Start end date for airing. */
    readonly airedStartDate: Date;

    /** Type. */
    readonly type: string;

    /** Status. */
    readonly status: string;
}

/** Domain model anime for preview. */
export class AnimePreview {

    /** Identifier. */
    readonly id: number;

    /** Image URL. */
    readonly imageUrl: string;

    /** Title in English. */
    readonly englishTitle: string;

    /** Title in Japanese */
    readonly japanTitle: string;

    /** Start end date for airing. */
    readonly airingStartDate: Date;

    /** Type. */
    readonly type: string;

    /** Status. */
    readonly status: string;

    public constructor(
        constructorData: AnimePreviewConstructorData
    ) {
        this.id = constructorData.id;
        this.imageUrl = constructorData.imageUrl;
        this.englishTitle = constructorData.englishTitle;
        this.japanTitle = constructorData.japanTitle;
        this.airingStartDate = constructorData.airingStartDate;
        this.type = constructorData.type;
        this.status = constructorData.status;
    }
}