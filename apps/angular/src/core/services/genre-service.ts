import { inject } from '@angular/core';
import { Genre } from '@js-camp/core/models/anime/genre';
import { Pagination } from '@js-camp/core/models/pagination';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { GenreMapper } from '@js-camp/core/mappers/anime/genre.mapper';
import { GenreDto } from '@js-camp/core/dtos/anime/genre.dto';

import { ApiUriBuilder } from './api-uri-builder';

/** Service for genres. */
export class GenreService {

	private readonly apiUriBuilder = inject(ApiUriBuilder);

	private readonly httpClient = inject(HttpClient);

	/**
	 * Get genre list.
	 * @param parameters - Anime list parameters.
	 * */
	public getGenreList(): Observable<Pagination<Genre>> {
		const uri = this.apiUriBuilder.buildGetGenreListUri();

		return this.httpClient.get<PaginationDto<GenreDto>>(uri)
			.pipe(
				map(paginationDto => PaginationMapper.fromDto(paginationDto, GenreMapper.fromDto)),
			);
	}
}
