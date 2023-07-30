import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

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
	 * @param pageSize - Page size.
	 * */
	public getAnimeList(pageSize: number): Observable<PaginationDto<Anime>> {
		const uri = this.apiUriBuilder.buildGetAnimeListUri();
		const queryParameters = new HttpParams()
			.set('limit', pageSize);

		return this.httpClient.get<PaginationDto<AnimeDto>>(uri, { params: queryParameters })
			.pipe(
				map(paginationDto => ({
					...paginationDto,
					results: paginationDto.results.map(dto => AnimeMapper.fromDto(dto)),
				})),
			);
	}
}
