import { ImageFileTypeDto } from '../../dtos/s3/image-file-type.dto';
import { EnumMapping } from '../enum-mapping';
import { ImageFileType } from '../../models/s3/image-file-type';

export namespace ImageFileTypeMapper {

	type ImageFileTypeMapping = EnumMapping<ImageFileTypeDto, ImageFileType>;

	const mappings: readonly ImageFileTypeMapping[] = [
		{ model: ImageFileType.AnimeImage, dto: ImageFileTypeDto.AnimeImage },
		{ model: ImageFileType.UserAvatar, dto: ImageFileTypeDto.UserAvatar },
	];

	/**
	 * Map model to dto for image file type.
	 * @param model Anime rating model.
	 */
	export function toDto(model: ImageFileType): ImageFileTypeDto {
		const mappingByModel = mappings.find(mapping => mapping.model === model);

		if (mappingByModel === undefined) {
			throw new Error(`There is no ImageFileTypeDto for ImageFileType ${model}`);
		}

		return mappingByModel.dto;
	}
}
