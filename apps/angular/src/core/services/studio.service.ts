import { Injectable, inject } from '@angular/core';
import { Pagination } from '@js-camp/core/models/pagination';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { StudioDto } from '@js-camp/core/dtos/anime/studio.dto';
import { Studio } from '@js-camp/core/models/anime/studio';
import { StudioMapper } from '@js-camp/core/mappers/anime/studio.mapper';
import { StudioParameters } from '@js-camp/core/models/anime/studio-parameters';
import { StudioParametersMapper } from '@js-camp/core/mappers/anime/studio-parameters.mapper';

import { ApiUrlBuilder } from './api-url-builder';

/** Service for studios. */
@Injectable()
export class StudioService {

	private readonly apiUrlBuilder = inject(ApiUrlBuilder);

	private readonly httpClient = inject(HttpClient);

	/**
	 * Get studio list.
	 * @param parameters - Studio list parameters.
	 * */
	public getStudoList(parameters: StudioParameters): Observable<Pagination<Studio>> {
		const url = this.apiUrlBuilder.buildGetStudioListUrl();

		return this.httpClient.get<PaginationDto<StudioDto>>(url, {
			params: new HttpParams({
				fromObject: { ...StudioParametersMapper.toDto(parameters) },
			}),
		})
			.pipe(
				map(paginationDto => PaginationMapper.fromDto(paginationDto, StudioMapper.fromDto)),
			);
	}

	/**
	 * Create studio.
	 * @param studioName - Studio name.
	 */
	public createStudio(studioName: string): Observable<number> {
		const url = this.apiUrlBuilder.buildCreateStudioUrl();

		return this.httpClient.post<StudioDto>(url, { name: studioName })
			.pipe(
				map(studioDto => studioDto.id),
			);
	}
}
