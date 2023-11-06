import { SortingParametersMapper } from '../sorting-parameters.mapper';
import { PaginationParametersMapper } from '../pagination-parameters.mapper';
import { StudioSortingField } from '../../models/anime/studio-sorting-field';
import { StudioParametersDto } from '../../dtos/anime/studio.parameters.dto';
import { StudioParameters } from '../../models/anime/studio-parameters';

export namespace StudioParametersMapper {

	const studioSortingFieldMap = new Map<StudioSortingField, string>([
		[StudioSortingField.Id, 'id'],
		[StudioSortingField.Name, 'name'],
	]);

	/**
	 * Maps model to dto.
	 * @param model Studio parameters dto.
	 */
	export function toDto(model: StudioParameters): StudioParametersDto {
		return {
			search: model.search,
			...PaginationParametersMapper.toDto(model),
			...SortingParametersMapper.toDto(model, studioSortingFieldMap),
		};
	}
}
