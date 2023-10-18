import { ImageFileTypeDto } from './image-file-type.dto';

/** DTO for s3 parameters request. */
export interface S3ParamsRequestDto {

	/** Image file type. */
	readonly dest: ImageFileTypeDto;

	/** File name. */
	readonly filename: string;
}
