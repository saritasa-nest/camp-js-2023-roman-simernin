import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { AnimeParameters } from '@js-camp/core/models/anime/anime-parameters';
import { AnimeParametersMapper } from '@js-camp/core/mappers/anime/anime-parameters.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/anime/anime-details.mapper';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { AnimeDetailsDto } from '@js-camp/core/dtos/anime/anime-details.dto';
import { NotFoundError } from '@js-camp/core/models/not-found-error';
import { AnimeManagement } from '@js-camp/core/models/anime/anime-management';
import { AnimeManagementMapper } from '@js-camp/core/mappers/anime/anime-management.mapper';

import { applicationApiErrorHandler, catchApiError } from '../utils/rxjs/catch-api-error';

import { ApiUriBuilder } from './api-uri-builder';

/** Service for actions with anime. */
@Injectable()
export class AnimeService {

	public constructor(
		private readonly httpClient: HttpClient,
		private readonly apiUriBuilder: ApiUriBuilder,
	) { }

	/**
	 * Get anime list.
	 * @param parameters - Anime list parameters.
	 * */
	public getAnimeList(parameters: AnimeParameters): Observable<Pagination<Anime>> {
		const uri = this.apiUriBuilder.buildGetAnimeListUri();

		return this.httpClient.get<PaginationDto<AnimeDto>>(uri, {
			params: new HttpParams({
				fromObject: { ...AnimeParametersMapper.toDto(parameters) },
			}),
		})
			.pipe(
				map(paginationDto => PaginationMapper.fromDto(paginationDto, AnimeMapper.fromDto)),
			);
	}

	/**
	 * Get anime by id..
	 * @param id - Anime id.
	 * */
	public getAnimeById(id: number): Observable<AnimeDetails> {
		const uri = this.apiUriBuilder.buildGetAnimeByIdUri(id);

		return this.httpClient.get<AnimeDetailsDto>(uri)
			.pipe(
				map(animeDetailsDto => AnimeDetailsMapper.fromDto(animeDetailsDto)),
				catchApiError((apiError, throwApiError$) => apiError.statusCode === HttpStatusCode.NotFound ?
					throwError(() => new NotFoundError('anime')) :
					throwApiError$),
			);
	}

	/**
	 * Create anime.
	 * @param animeManagement - Anime management model.
	 */
	public createAnime(animeManagement: AnimeManagement): Observable<number | void> {
		const uri = this.apiUriBuilder.buildCreateAnimeUri();

		return this.httpClient.post<AnimeDetailsDto>(uri, AnimeManagementMapper.toCreateDto(animeManagement))
			.pipe(
				map(detailsDto => detailsDto.id),
				catchApiError(apiError => applicationApiErrorHandler(apiError)),
			);
	}

	/**
	 * Edit anime.
	 * @param animeManagement - Anime management model.
	 * @param id - Anime id.
	 */
	public editAnime(id: number, animeManagement: AnimeManagement): Observable<void> {
		const uri = this.apiUriBuilder.buildEditAnimeUri(id);

		return this.httpClient.put<void>(uri, AnimeManagementMapper.toEditDto(animeManagement))
			.pipe(
				catchApiError(apiError => applicationApiErrorHandler(apiError)),
			);
	}

	/**
	 * Delete anime by id.
	 * @param id - Anime id.
	 */
	public deleteAnime(id: number): Observable<void> {
		const uri = this.apiUriBuilder.buildDeleteAnimeUri(id);

		return this.httpClient.delete<void>(uri);
	}
}
