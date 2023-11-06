import { Observable, map } from 'rxjs';
import { MultipleAutocompleteItem } from '@js-camp/core/models/multiple-autocomplete-item';
import { MultipleAutocompleteParameters } from '@js-camp/core/models/multiple-autocomplete-parameters';
import { inject } from '@angular/core';
import { Pagination } from '@js-camp/core/models/pagination';
import { GenreSortingField } from '@js-camp/core/models/anime/genre-sorting-field';
import { SortingDirection } from '@js-camp/core/models/sorting-parameters';
import { StudioSortingField } from '@js-camp/core/models/anime/studio-sorting-field';

import { MultipleAutocompleteService } from './multiple-autocomplete.service';
import { GenreService } from './genre-service';
import { StudioService } from './studio.service';

export const animeMultipleAutocompleteGroups = {
	genreGroup: 'Genres',
	studioGroup: 'Studios',
};

/** Anime multiple autocomplete service. */
export class AnimeMultipleAutocompleteService extends MultipleAutocompleteService {

	private readonly genreService = inject(GenreService);

	private readonly studioService = inject(StudioService);

	/** @inheritdoc */
	public override getItems(itemGroup: string, parameters: MultipleAutocompleteParameters):
	Observable<Pagination<MultipleAutocompleteItem>> {
		if (itemGroup === animeMultipleAutocompleteGroups.genreGroup) {
			return this.getGenreItems(parameters);
		}

		if (itemGroup === animeMultipleAutocompleteGroups.studioGroup) {
			return this.getStudioItems(parameters);
		}

		throw new Error('Invalid anime item group for multiple autocomplete.');
	}

	private getGenreItems(parameters: MultipleAutocompleteParameters): Observable<Pagination<MultipleAutocompleteItem>> {
		return this.genreService.getGenreList({
			field: GenreSortingField.Name,
			direction: SortingDirection.Ascending,
			...parameters,
		}).pipe(
			map(paginatedGenres => ({
				totalCount: paginatedGenres.totalCount,
				results: paginatedGenres.results
					.map(genre => ({ id: genre.id, name: genre.name })),
			})),
		);
	}

	private getStudioItems(parameters: MultipleAutocompleteParameters): Observable<Pagination<MultipleAutocompleteItem>> {
		return this.studioService.getStudoList({
			field: StudioSortingField.Name,
			direction: SortingDirection.Ascending,
			...parameters,
		}).pipe(
			map(paginatedGenres => ({
				totalCount: paginatedGenres.totalCount,
				results: paginatedGenres.results
					.map(genre => ({ id: genre.id, name: genre.name })),
			})),
		);
	}
}
