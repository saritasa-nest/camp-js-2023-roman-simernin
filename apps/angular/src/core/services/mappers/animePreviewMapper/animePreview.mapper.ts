import { Injectable } from '@angular/core';

import { AnimePreview } from "@js-camp/angular/core/models/animePreview";
import { AnimePreviewDto } from "./dtos/animePreview.dto";

//* Mapper for anime preview model.
@Injectable()
export class AnimePreviewMapper {

    /**
     * Map dto to model for anime preview.
     * @param dto Anime preview DTO.
     */
    public fromDto(dto: AnimePreviewDto): AnimePreview {
        return new AnimePreview({
            id: dto.id,
            imageUrl: dto.image,
            englishTitle: dto.title_eng,
            japaneseTitle: dto.title_jpn,
            airedStartDate: new Date(dto.aired.start),
            type: dto.type,
            status: dto.status
        });
    }
}