import { Observable, map } from 'rxjs';
import { MultipleAutocompleteItem } from '@js-camp/core/models/multiple-autocomplete-item';
import { MultipleAutocompleteParameters } from '@js-camp/core/models/multiple-autocomplete-parameters';
import { inject } from '@angular/core';
import { Pagination } from '@js-camp/core/models/pagination';

import { MultipleAutocompleteService } from './multiple-autocomplete.service';
import { GenreService } from './genre-service';

export const animeMultipleAutocompleteGroups = {
	genreGroup: 'genre',
};

/** Anime multiple autocomplete service. */
export class AnimeMultipleAutocompleteService extends MultipleAutocompleteService {

	private readonly genreService = inject(GenreService);

	/** @inheritdoc */
	public override getItems(itemGroup: string, parameters: MultipleAutocompleteParameters):
	Observable<Pagination<MultipleAutocompleteItem>> {
		if (itemGroup === animeMultipleAutocompleteGroups.genreGroup) {
			return this.getGenreItems(parameters);
		}

		throw new Error('Invalid anime item group for multiple autocomplete.');
	}

	private getGenreItems(parameters: MultipleAutocompleteParameters): Observable<Pagination<MultipleAutocompleteItem>> {
		return this.genreService.getGenreList({ ...parameters }).pipe(
			map(paginatedGenres => ({
				totalCount: paginatedGenres.totalCount,
				results: paginatedGenres.results
					.map(genre => ({ id: genre.id, name: genre.name })),
			})),
		);
	}
}
