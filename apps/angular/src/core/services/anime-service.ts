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

import { ApiUrlBuilder } from './api-url-builder';
import { ImageFileService } from './image-file.service';

/** Service for actions with anime. */
@Injectable()
export class AnimeService {

	private readonly httpClient = inject(HttpClient);

	private readonly apiUrlBuilder = inject(ApiUrlBuilder);

	private readonly imageFileService = inject(ImageFileService);

	/**
	 * Get anime list.
	 * @param parameters - Anime list parameters.
	 * */
	public getAnimeList(parameters: AnimeParameters): Observable<Pagination<Anime>> {
		const url = this.apiUrlBuilder.buildGetAnimeListUrl();

		return this.httpClient.get<PaginationDto<AnimeDto>>(url, {
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
		const url = this.apiUrlBuilder.buildGetAnimeByIdUrl(id);

		return this.httpClient.get<AnimeDetailsDto>(url)
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
		const url = this.apiUrlBuilder.buildCreateAnimeUrl();

		return this.httpClient.post<AnimeDetailsDto>(url, AnimeCreateMapper.toDto(animeCreateData)).pipe(
			map(details => details.id),
		);
	}

	/**
	 * Edit anime.
	 * @param animeEditData - Anime edit data.
	 * @param id - Anime id.
	 */
	public editAnime(id: number, animeEditData: AnimeEditData): Observable<number> {
		const url = this.apiUrlBuilder.buildEditAnimeUrl(id);

		return this.httpClient.put<AnimeDetailsDto>(url, AnimeEditMapper.toDto(animeEditData)).pipe(
			map(detailsDto => detailsDto.id),
		);
	}

	/**
	 * Delete anime by id.
	 * @param id - Anime id.
	 */
	public deleteAnime(id: number): Observable<void> {
		const url = this.apiUrlBuilder.buildDeleteAnimeUrl(id);

		return this.httpClient.delete<void>(url);
	}
}
