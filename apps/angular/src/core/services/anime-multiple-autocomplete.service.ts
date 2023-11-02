import { Observable, map } from 'rxjs';
import { MultipleAutocompleteItem } from '@js-camp/core/models/multiple-autocomplete-item';
import { MultipleAutocompleteParameters } from '@js-camp/core/models/multiple-autocomplete-parameters';
import { inject } from '@angular/core';

import { GenreService } from './genre-service';
import { MultipleAutocompleteService } from './multiple-autocomplete.service';

export const animeMultipleAutocompleteGroups = {
	genreGroup: 'genre',
};

/** Anime multiple autocomplete service. */
export class AnimeMultipleAutocompleteService extends MultipleAutocompleteService {

	private readonly genreService = inject(GenreService);

	/** @inheritdoc */
	public override getItems(itemGroup: string, parameters: MultipleAutocompleteParameters):
	Observable<readonly MultipleAutocompleteItem[]> {
		if (itemGroup === animeMultipleAutocompleteGroups.genreGroup) {
			return this.getGenreItems(parameters);
		}

		throw new Error('Invalid anime item group for multiple autocomplete.');
	}

	private getGenreItems(parameters: MultipleAutocompleteParameters): Observable<readonly MultipleAutocompleteItem[]> {
		return this.genreService.getGenreList({ search: parameters.search }).pipe(
			map(paginatedGenres => paginatedGenres.results
				.map(genre => ({ id: genre.id, name: genre.name }))),
		);
	}
}
