import { AnimeSourceDto } from '../../dtos/anime/anime-source.dto';
import { EnumMapping } from '../enum-mapping';
import { AnimeSource } from '../../models/anime/anime-source';

export namespace AnimeSourceMapper {

	type AnimeSourceMapping = EnumMapping<AnimeSourceDto, AnimeSource>;

	const mappings: readonly AnimeSourceMapping[] = [
		{ model: AnimeSource.FourKomaMang, dto: AnimeSourceDto.FourKomaMang },
		{ model: AnimeSource.Book, dto: AnimeSourceDto.Book },
		{ model: AnimeSource.CardGame, dto: AnimeSourceDto.CardGame },
		{ model: AnimeSource.LightNovel, dto: AnimeSourceDto.LightNovel },
		{ model: AnimeSource.Manga, dto: AnimeSourceDto.Manga },
		{ model: AnimeSource.MixedMedia, dto: AnimeSourceDto.MixedMedia },
		{ model: AnimeSource.Music, dto: AnimeSourceDto.Music },
		{ model: AnimeSource.Novel, dto: AnimeSourceDto.Novel },
		{ model: AnimeSource.Original, dto: AnimeSourceDto.Original },
		{ model: AnimeSource.PictureBook, dto: AnimeSourceDto.PictureBook },
		{ model: AnimeSource.Radio, dto: AnimeSourceDto.Radio },
		{ model: AnimeSource.VisualNovel, dto: AnimeSourceDto.VisualNovel },
		{ model: AnimeSource.WebManga, dto: AnimeSourceDto.WebManga },
		{ model: AnimeSource.WebNovel, dto: AnimeSourceDto.WebNovel },
		{ model: AnimeSource.Other, dto: AnimeSourceDto.Other },
		{ model: AnimeSource.Unknown, dto: AnimeSourceDto.Unknown },
		{ model: AnimeSource.Game, dto: AnimeSourceDto.Game },
	];

	/**
	 * Map dto to model for anime source.
	 * @param dto Anime source dto.
	 */
	export function fromDto(dto: AnimeSourceDto): AnimeSource {
		const mappingByDto = mappings.find(mapping => mapping.dto === dto);

		if (mappingByDto === undefined) {
			throw new Error(`There is no AnimeSource for AnimeSourceDto ${dto}`);
		}

		return mappingByDto.model;
	}

	/**
	 * Map model to dto for anime source.
	 * @param model Anime source model.
	 */
	export function toDto(model: AnimeSource): AnimeSourceDto {
		const mappingByModel = mappings.find(mapping => mapping.model === model);

		if (mappingByModel === undefined) {
			throw new Error(`There is no AnimeSourceDto for AnimeSource ${model}`);
		}

		return mappingByModel.dto;
	}
}
