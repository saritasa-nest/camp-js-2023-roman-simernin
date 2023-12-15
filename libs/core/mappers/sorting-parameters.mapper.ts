import { SortingParametersDto } from '../dtos/sorting-parameters.dto';
import { SortingDirection, SortingParameters } from '../models/sorting-parameters';

export namespace SortingParametersMapper {

	/**
	 * Maps model to dto.
	 * @param model - Model.
	 * @param sortingFieldMap - Sorting field map.
	 */
	export function toDto<TSortingField extends string>(
		model: SortingParameters<TSortingField>,
		sortingFieldMap: Map<TSortingField, string>,
	): SortingParametersDto {
		if (model.field === null || model.direction === null) {
			return {
				ordering: '',
			};
		}

		const sortingField = sortingFieldMap.get(model.field);

		if (sortingField === undefined) {
			console.warn('There is no sorting for this field.');

			return {
				ordering: '',
			};
		}

		return {
			ordering: model.direction === SortingDirection.Ascending ? sortingField : `-${sortingField}`,
		};
	}
}
