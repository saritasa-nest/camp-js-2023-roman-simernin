import { StudioDto } from '../../dtos/anime/studio.dto';
import { Studio } from '../../models/anime/studio';

export namespace StudioMapper {

	/**
	 * Maps dto to model.
	 * @param dto Genre dto.
	 */
	export function fromDto(dto: StudioDto): Studio {
		return ({
			id: dto.id,
			name: dto.name,
		});
	}
}
