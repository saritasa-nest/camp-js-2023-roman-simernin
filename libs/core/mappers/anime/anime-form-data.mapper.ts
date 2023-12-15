import { AnimeCreateData } from '../../models/anime/anime-create-data';
import { AnimeDetails } from '../../models/anime/anime-details';
import { AnimeFormData } from '../../models/anime/anime-form-data';
import { AnimeEditData } from '../../models/anime/anime-edit-data';

export namespace AnimeFormDataMapper {

	/**
	 * Map anime details to form data.
	 * @param details - Anime details.
	 */
	export function fromDetails(details: AnimeDetails): AnimeFormData {
		return {
			imageFile: details.imageUrl,
			youtubeTrailerId: details.youtubeTrailerId,
			englishTitle: details.englishTitle,
			japaneseTitle: details.japaneseTitle,
			type: details.type,
			status: details.status,
			isAiring: details.isAiring,
			airedStart: details.airedDates.start,
			airedEnd: details.airedDates.end,
			description: details.description,
			ageRating: details.ageRating,
			source: details.source,
			season: details.season,
			genres: details.genres.map(genre => ({ id: genre.id, name: genre.name })),
			studios: details.studios.map(studio => ({ id: studio.id, name: studio.name })),
		};
	}

	/**
	 * Map anime form data to creating data.
	 * @param params - Anime creating params.
	 */
	export function toCreateData(params: {
		formData: AnimeFormData;
		genreIds: number[];
		studioIds: number[];
		imageUrl: string;
	}): AnimeCreateData {
		const { formData, genreIds, studioIds, imageUrl } = params;
		return {
			genreIds,
			studioIds,
			imageUrl,
			youtubeTrailerId: formData.youtubeTrailerId,
			englishTitle: formData.englishTitle,
			japaneseTitle: formData.japaneseTitle,
			type: formData.type,
			status: formData.status,
			isAiring: formData.isAiring,
			airedStart: formData.airedStart,
			airedEnd: formData.airedEnd,
			description: formData.description,
			ageRating: formData.ageRating,
			source: formData.source,
			season: formData.season,
		};
	}

	/**
	 * Map anime form data to editing data.
	 * @param params - Anime editing params.
	 */
	export function toEditData(params: {
		formData: AnimeFormData;
		genreIds: number[];
		studioIds: number[];
		imageUrl: string;
	}): AnimeEditData {
		const { formData, genreIds, studioIds, imageUrl } = params;
		return {
			genreIds,
			studioIds,
			imageUrl,
			youtubeTrailerId: formData.youtubeTrailerId,
			englishTitle: formData.englishTitle,
			japaneseTitle: formData.japaneseTitle,
			type: formData.type,
			status: formData.status,
			isAiring: formData.isAiring,
			airedStart: formData.airedStart,
			airedEnd: formData.airedEnd,
			description: formData.description,
			ageRating: formData.ageRating,
			source: formData.source,
			season: formData.season,
		};
	}
}
