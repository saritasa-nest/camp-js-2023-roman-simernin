import { AnimeDetails } from '../../models/anime/anime-details';
import { AnimeFormData } from '../../models/anime/anime-form-data';

export namespace AnimeFormDataMapper {

	/**
	 * Map dto to model for anime management.
	 * @param details Anime details.
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
}
