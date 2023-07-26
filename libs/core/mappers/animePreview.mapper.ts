import { Anime } from '../models/animePreview';
import { AnimeDto } from '../dtos/animePreview.dto';

export namespace AnimeMapper {

	/**
	 * Map dto to model for anime preview.
	 * @param dto Genre dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			imageUrl: dto.image,
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			airedStartDate: new Date(dto.aired.start),
			type: dto.type,
			status: dto.status.replace(/_/g, ' '),
		});
	}
}
