import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AnimePreview } from '@js-camp/core/models/animePreview';
import { AnimePreviewDto } from '@js-camp/core/dtos/animePreview.dto';
import { ApiUriBuilder } from './apiUriBuilder';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimePreviewMapper } from '@js-camp/core/mappers/animePreview.mapper';

/** Service for actions with anime. */
@Injectable()
export class AnimeService {

    public constructor(
        private readonly httpClient: HttpClient,
        private readonly apiUriBuilder: ApiUriBuilder) { }

    /** Search anime. */
    public searchAnime(): Observable<AnimePreview[]> {
        const uri = this.apiUriBuilder.buildSearchAnimeUri();

        return this.httpClient.get<PaginationDto<AnimePreviewDto>>(uri)
            .pipe(
                map(paginationDto => paginationDto.results),
                map(animePreviewDtos => animePreviewDtos.map(dto => AnimePreviewMapper.fromDto(dto)))
            );
    }
}