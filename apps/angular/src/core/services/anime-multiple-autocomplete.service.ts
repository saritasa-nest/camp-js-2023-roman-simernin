import { Observable } from 'rxjs';
import { MultipleAutocompleteItem } from '@js-camp/core/models/multiple-autocomplete-item';
import { MultipleAutocompleteParameters } from '@js-camp/core/models/multiple-autocomplete-parameters';
import { inject } from '@angular/core';
import { Pagination } from '@js-camp/core/models/pagination';
import { GenreSortingField } from '@js-camp/core/models/anime/genre-sorting-field';
import { SortingDirection } from '@js-camp/core/models/sorting-parameters';
import { StudioSortingField } from '@js-camp/core/models/anime/studio-sorting-field';

import { MultipleAutocompleteItemProvider, MultipleAutocompleteService } from './multiple-autocomplete.service';
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
	protected override getProviders(): Map<string, MultipleAutocompleteItemProvider> {
		return new Map<string, MultipleAutocompleteItemProvider>([
			[animeMultipleAutocompleteGroups.genreGroup, this.getGenreItems],
			[animeMultipleAutocompleteGroups.studioGroup, this.getStudioItems],
		]);
	}

	private getGenreItems(parameters: MultipleAutocompleteParameters): Observable<Pagination<MultipleAutocompleteItem>> {
		return this.genreService.getGenreList({
			field: GenreSortingField.Name,
			direction: SortingDirection.Ascending,
			...parameters,
		});
	}

	private getStudioItems(parameters: MultipleAutocompleteParameters): Observable<Pagination<MultipleAutocompleteItem>> {
		return this.studioService.getStudoList({
			field: StudioSortingField.Name,
			direction: SortingDirection.Ascending,
			...parameters,
		});
	}
}
