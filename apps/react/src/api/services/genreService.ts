import { Genre } from '@js-camp/core/models/anime/genre';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { GenreDto } from '@js-camp/core/dtos/anime/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/anime/genre.mapper';

import { http } from '..';

const url = 'anime/genres/';

export namespace GenresService {

	/** Fetches a list of genres. */
	export async function fetchGenres(): Promise<Genre[]> {
		const { data } = await http.get<PaginationDto<GenreDto>>(url);
		return data.results.map(dto => GenreMapper.fromDto(dto));
	}
}
