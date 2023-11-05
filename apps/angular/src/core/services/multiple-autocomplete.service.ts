import { MultipleAutocompleteItem } from '@js-camp/core/models/multiple-autocomplete-item';
import { MultipleAutocompleteParameters } from '@js-camp/core/models/multiple-autocomplete-parameters';
import { Pagination } from '@js-camp/core/models/pagination';
import { Observable } from 'rxjs';

/** Multiple autocomplete service. */
export abstract class MultipleAutocompleteService {

	/**
		* Get items for multiple autocomplete.
		* @param itemGroup - Item group.
		* @param parameters - Multiple autocomplete parameters.
		*/
	public abstract getItems(itemGroup: string, parameters: MultipleAutocompleteParameters):
	Observable<Pagination<MultipleAutocompleteItem>>;
}
