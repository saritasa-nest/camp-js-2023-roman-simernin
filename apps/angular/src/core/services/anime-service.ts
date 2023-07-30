import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';

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
	 * @param paginationParameters - Pagination parameters.
	 * */
	public getAnimeList(paginationParameters: PaginationParameters): Observable<Pagination<Anime>> {
		const uri = this.apiUriBuilder.buildGetAnimeListUri();

		let queryParameters = new HttpParams()
			.set('limit', paginationParameters.pageSize);

		if (paginationParameters.offset !== 0) {
			queryParameters = queryParameters
				.set('offset', paginationParameters.offset);
		}

		return this.httpClient.get<PaginationDto<AnimeDto>>(uri, { params: queryParameters })
			.pipe(
				map(paginationDto => ({
					totalCount: paginationDto.count,
					results: paginationDto.results.map(dto => AnimeMapper.fromDto(dto)),
				})),
			);
	}
}
