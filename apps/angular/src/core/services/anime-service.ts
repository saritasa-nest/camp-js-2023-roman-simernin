import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { AnimeListParameters } from '@js-camp/core/models/anime-list-parameters';

import { AnimeListParametersMapper } from '@js-camp/core/mappers/anime-list-parameters.mapper';

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
	public getAnimeList(parameters: AnimeListParameters): Observable<Pagination<Anime>> {
		const uri = this.apiUriBuilder.buildGetAnimeListUri();

		return this.httpClient.get<PaginationDto<AnimeDto>>(uri, {
			params: new HttpParams({
				fromObject: AnimeListParametersMapper.toDto(parameters),
			}),
		})
			.pipe(
				map(paginationDto => ({
					totalCount: paginationDto.count,
					results: paginationDto.results.map(dto => AnimeMapper.fromDto(dto)),
				})),
			);
	}
}
