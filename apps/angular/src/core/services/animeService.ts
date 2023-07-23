import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AnimePreview } from "../models/animePreview";
import { AnimePreviewDto } from './mappers/animePreviewMapper/dtos/animePreview.dto';
import { AnimePreviewMapper } from './mappers/animePreviewMapper/animePreview.mapper';
import { ApiUriBuilder } from './apiUriBuilder';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

/** Service for actions with anime. */
@Injectable()
export class AnimeService {

    public constructor(
        private readonly httpClient: HttpClient,
        private readonly animePreviewMapper: AnimePreviewMapper,
        private readonly apiUriBuilder: ApiUriBuilder) { }

    /** Search anime. */
    public searchAnime(): Observable<AnimePreview[]> {
        const uri = this.apiUriBuilder.buildSearchAnimeUri();

        return this.httpClient.get<PaginationDto<AnimePreviewDto>>(uri)
            .pipe(
                map(paginationDto => paginationDto.results),
                map(animePreviewDtos => animePreviewDtos.map(dto => this.animePreviewMapper.fromDto(dto)))
            );
    }
}