import { Injectable, inject } from '@angular/core';
import { Genre } from '@js-camp/core/models/anime/genre';
import { Pagination } from '@js-camp/core/models/pagination';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { GenreMapper } from '@js-camp/core/mappers/anime/genre.mapper';
import { GenreDto } from '@js-camp/core/dtos/anime/genre.dto';
import { GenreParameters } from '@js-camp/core/models/anime/genre-parameters';
import { GenreParametersMapper } from '@js-camp/core/mappers/anime/genre-parameters.mapper';

import { ApiUrlBuilder } from './api-url-builder';

/** Service for genres. */
@Injectable()
export class GenreService {

	private readonly apiUrlBuilder = inject(ApiUrlBuilder);

	private readonly httpClient = inject(HttpClient);

	/**
	 * Get genre list.
	 * @param parameters - Genre list parameters.
	 * */
	public getGenreList(parameters: GenreParameters): Observable<Pagination<Genre>> {
		const url = this.apiUrlBuilder.buildGetGenreListUrl();

		return this.httpClient.get<PaginationDto<GenreDto>>(url, {
			params: new HttpParams({
				fromObject: { ...GenreParametersMapper.toDto(parameters) },
			}),
		})
			.pipe(
				map(paginationDto => PaginationMapper.fromDto(paginationDto, GenreMapper.fromDto)),
			);
	}

	/**
	 * Create genre.
	 * @param genreName - Genre name.
	 */
	public createGenre(genreName: string): Observable<number> {
		const url = this.apiUrlBuilder.buildCreateGenreUrl();

		return this.httpClient.post<GenreDto>(url, { name: genreName, type: 'GENRES' })
			.pipe(
				map(genreDto => genreDto.id),
			);
	}
}
