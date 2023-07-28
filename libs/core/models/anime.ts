/** Provides anime preview model constructor data. */
export interface AnimeConstructorData {

	/** Identifier. */
	readonly id: number;

	/** Image URL. */
	readonly imageUrl: string;

	/** Title in English. */
	readonly englishTitle: string;

	/** Title in Japanese. */
	readonly japaneseTitle: string;

	/** Start end date for airing. */
	readonly airedStartDate: Date;

	/** Type. */
	readonly type: string;

	/** Status. */
	readonly status: string;
}

/** Domain model anime for preview. */
export class Anime {

	/** Identifier. */
	public readonly id: number;

	/** Image URL. */
	public readonly imageUrl: string;

	/** Title in English. */
	public readonly englishTitle: string;

	/** Title in Japanese. */
	public readonly japaneseTitle: string;

	/** Start end date for airing. */
	public readonly airedStartDate: Date;

	/** Type. */
	public readonly type: string;

	/** Status. */
	public readonly status: string;

	public constructor(
		constructorData: AnimeConstructorData,
	) {
		this.id = constructorData.id;
		this.imageUrl = constructorData.imageUrl;
		this.englishTitle = constructorData.englishTitle;
		this.japaneseTitle = constructorData.japaneseTitle;
		this.airedStartDate = constructorData.airedStartDate;
		this.type = constructorData.type;
		this.status = constructorData.status;
	}
}
