import { MultipleAutocompleteItem } from '@js-camp/core/models/multiple-autocomplete-item';
import { MultipleAutocompleteParameters } from '@js-camp/core/models/multiple-autocomplete-parameters';
import { Pagination } from '@js-camp/core/models/pagination';
import { EMPTY, Observable } from 'rxjs';

/** Multiple autocomplete item orovider. */
export type MultipleAutocompleteItemProvider = (parameters: MultipleAutocompleteParameters) =>
Observable<Pagination<MultipleAutocompleteItem>>;

/** Multiple autocomplete service. */
export abstract class MultipleAutocompleteService {

	/**
		* Get items for multiple autocomplete.
		* @param itemGroup - Item group.
		* @param parameters - Multiple autocomplete parameters.
		*/
	public getItems(itemGroup: string, parameters: MultipleAutocompleteParameters):
	Observable<Pagination<MultipleAutocompleteItem>> {
		const multipleAutocompleteItemProvider = this.getProviders().get(itemGroup);

		if (multipleAutocompleteItemProvider === undefined) {
			console.error('Invalid item group for multiple autocomplete.');

			return EMPTY;
		}

		return multipleAutocompleteItemProvider.bind(this)(parameters);
	}

	/** Get providers for multiple autocomplete items. */
	protected abstract getProviders(): Map<string, MultipleAutocompleteItemProvider>;
}
