import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { SortingParameters } from '@js-camp/core/models/sorting-parameters';
import { AnimeSortingField } from '@js-camp/core/models/anime-sorting-field';
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
	 * @param sortingParameters - Sorting parameters.
	 * */
	public getAnimeList(
		paginationParameters: PaginationParameters,
		sortingParameters: SortingParameters<AnimeSortingField>,
	): Observable<Pagination<Anime>> {
		const uri = this.apiUriBuilder.buildGetAnimeListUri();

		let queryParameters = new HttpParams();

		queryParameters = this.addPagination(queryParameters, paginationParameters);
		queryParameters = this.addSorting(queryParameters, sortingParameters);

		return this.httpClient.get<PaginationDto<AnimeDto>>(uri, { params: queryParameters })
			.pipe(
				map(paginationDto => ({
					totalCount: paginationDto.count,
					results: paginationDto.results.map(dto => AnimeMapper.fromDto(dto)),
				})),
			);
	}

	private addPagination(httpParameters: HttpParams, paginationParameters: PaginationParameters): HttpParams {
		let httpParametersWithPagination = httpParameters.set('limit', paginationParameters.pageSize);

		if (paginationParameters.offset !== 0) {
			httpParametersWithPagination = httpParametersWithPagination
				.set('offset', paginationParameters.offset);
		}

		return httpParametersWithPagination;
	}

	private addSorting(httpParameters: HttpParams, sortingParameters: SortingParameters<AnimeSortingField>): HttpParams {
		if (sortingParameters.field === null) {
			return httpParameters;
		}

		let sortingString: string;

		switch (sortingParameters.field) {
			case AnimeSortingField.EnglishTitle:
				sortingString = 'title_eng';
				break;
			case AnimeSortingField.AiredStartDate:
				sortingString = 'aired__startswith';
				break;
			case AnimeSortingField.Status:
				sortingString = 'status';
				break;
			default:
				throw new Error('There is no sorting for this field.');
		}

		if (!sortingParameters.isAscending) {
			sortingString = `-${sortingString}`;
		}

		const httpParametersWithSorting = httpParameters.set('ordering', sortingString);

		return httpParametersWithSorting;
	}
}
