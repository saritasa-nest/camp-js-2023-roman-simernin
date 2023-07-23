import { AnimePreview } from "../models/animePreview";
import { AnimePreviewDto } from "../dtos/animePreview.dto";

export namespace AnimePreviewMapper {
    /**
     * Map dto to model for anime preview.
     * @param dto Anime preview DTO.
     */
    export function fromDto(dto: AnimePreviewDto): AnimePreview {
        return new AnimePreview({
            id: dto.id,
            imageUrl: dto.image,
            englishTitle: dto.title_eng,
            japaneseTitle: dto.title_jpn,
            airedStartDate: new Date(dto.aired.start),
            type: dto.type,
            status: dto.status.replace(/_/g, ' ')
        });
    }
}