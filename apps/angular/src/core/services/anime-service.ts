import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { ApiUriBuilder } from './apiUriBuilder';

/** Service for actions with anime. */
@Injectable()
export class AnimeService {

	public constructor(
		private readonly httpClient: HttpClient,
		private readonly apiUriBuilder: ApiUriBuilder,
	) { }

	/** Search anime. */
	public searchAnime(): Observable<Anime[]> {
		const uri = this.apiUriBuilder.buildSearchAnimeUri();

		return this.httpClient.get<PaginationDto<AnimeDto>>(uri)
			.pipe(
				map(paginationDto => paginationDto.results),
				map(animePreviewDtos => animePreviewDtos.map(dto => AnimeMapper.fromDto(dto))),
			);
	}
}
