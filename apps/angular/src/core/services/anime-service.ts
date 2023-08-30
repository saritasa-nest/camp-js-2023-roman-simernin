import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
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
			);
	}
}
