import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';

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
import { AnimeCreateData } from '@js-camp/core/models/anime/anime-create-data';
import { AnimeCreateMapper } from '@js-camp/core/mappers/anime/anime-create.mapper';
import { AnimeEditData } from '@js-camp/core/models/anime/anime-edit-data';
import { AnimeEditMapper } from '@js-camp/core/mappers/anime/anime-edit.mapper';

import { catchApiError } from '../utils/rxjs/catch-api-error';

import { ApiUriBuilder } from './api-uri-builder';
import { ImageFileService } from './image-file.service';

/** Service for actions with anime. */
@Injectable()
export class AnimeService {

	private readonly httpClient = inject(HttpClient);

	private readonly apiUriBuilder = inject(ApiUriBuilder);

	private readonly imageFileService = inject(ImageFileService);

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
	 * @param animeCreateData - Anime creatiom data.
	 */
	public createAnime(animeCreateData: AnimeCreateData): Observable<number> {
		const uri = this.apiUriBuilder.buildCreateAnimeUri();

		return this.httpClient.post<AnimeDetailsDto>(uri, AnimeCreateMapper.toDto(animeCreateData)).pipe(
			map(details => details.id),
		);
	}

	/**
	 * Edit anime.
	 * @param animeEditData - Anime edit data.
	 * @param id - Anime id.
	 */
	public editAnime(id: number, animeEditData: AnimeEditData): Observable<number> {
		const uri = this.apiUriBuilder.buildEditAnimeUri(id);

		return this.httpClient.put<AnimeDetailsDto>(uri, AnimeEditMapper.toDto(animeEditData)).pipe(
			map(detailsDto => detailsDto.id),
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
