import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { GenreService } from '@js-camp/angular/core/services/genre-service';
import { StudioService } from '@js-camp/angular/core/services/studio.service';
import { MultipleAutocompleteItemProvider } from '@js-camp/angular/shared/components/multiple-autocomplete/multiple-autocomplete.component';
import { AnimeType } from '@js-camp/core/models/anime/anime';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { AnimeRating } from '@js-camp/core/models/anime/anime-rating';
import { AnimeSeason } from '@js-camp/core/models/anime/anime-season';
import { AnimeSource } from '@js-camp/core/models/anime/anime-source';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { GenreSortingField } from '@js-camp/core/models/anime/genre-sorting-field';
import { StudioSortingField } from '@js-camp/core/models/anime/studio-sorting-field';
import { MultipleAutocompleteParameters } from '@js-camp/core/models/multiple-autocomplete-parameters';
import { SortingDirection } from '@js-camp/core/models/sorting-parameters';
import { EnumUtils } from '@js-camp/core/utils/enum.utils';

import { AnimeManagementFormControls } from './anime-form';

/** Anime form component. */
@Component({
	selector: 'camp-anime-form',
	templateUrl: './anime-form.component.html',
	styleUrls: ['./anime-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeFormComponent implements OnInit {
	/** Anime form data. */
	@Input()
	public animeFormData: AnimeFormData | null = null;

	/** Submit event. */
	@Output()
	public readonly submitEvent = new EventEmitter<AnimeFormData>();

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly genreService = inject(GenreService);

	private readonly studioService = inject(StudioService);

	/** Anime types. */
	protected readonly animeTypes = EnumUtils.toArray(AnimeType);

	/** Anime statuses. */
	protected readonly animeStatuses = EnumUtils.toArray(AnimeStatus);

	/** Anime ratings. */
	protected readonly animeRatings = EnumUtils.toArray(AnimeRating);

	/** Anime sources. */
	protected readonly animeSources = EnumUtils.toArray(AnimeSource);

	/** Anime seasons. */
	protected readonly animeSeasons = EnumUtils.toArray(AnimeSeason);

	/** Anime form data group. */
	protected readonly formGroup: FormGroup<AnimeManagementFormControls>;

	public constructor() {
		this.formGroup = this.initAnimeForm();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		if (this.animeFormData !== null) {
			this.formGroup.patchValue(this.animeFormData);
		}
	}

	/**
	 * Track by index.
	 * @param index Item index.
	 */
	protected trackByIndex(index: number): number {
		return index;
	}

	/** Handle anime management form submitting. */
	protected handleSubmit(): void {
		this.formGroup.markAllAsTouched();

		if (this.formGroup.invalid) {
			return;
		}

		const formData = this.formGroup.getRawValue();

		this.submitEvent.emit(formData);
	}

	/** Get genre MultipleAutocompleteItemProvider. */
	protected getGenreItemsProvider(): MultipleAutocompleteItemProvider {
		return (parameters: MultipleAutocompleteParameters) =>
			this.genreService.getGenreList({
				field: GenreSortingField.Name,
				direction: SortingDirection.Ascending,
				...parameters,
			});
	}

	/** Get studio MultipleAutocompleteItemProvider. */
	protected getStudioItemsProvider(): MultipleAutocompleteItemProvider {
		return (parameters: MultipleAutocompleteParameters) =>
			this.studioService.getStudoList({
				field: StudioSortingField.Name,
				direction: SortingDirection.Ascending,
				...parameters,
			});
	}

	private initAnimeForm(): FormGroup<AnimeManagementFormControls> {
		return this.formBuilder.group<AnimeManagementFormControls>({
			englishTitle: this.formBuilder.control('', Validators.required),
			japaneseTitle: this.formBuilder.control('', Validators.required),
			type: this.formBuilder.control(AnimeType.Unknown, Validators.required),
			status: this.formBuilder.control(AnimeStatus.NotYetAired, Validators.required),
			isAiring: this.formBuilder.control(false, Validators.required),
			description: this.formBuilder.control('', Validators.required),
			ageRating: this.formBuilder.control(AnimeRating.Unknown, Validators.required),
			source: this.formBuilder.control(AnimeSource.Unknown, Validators.required),
			season: this.formBuilder.control(AnimeSeason.NonSeasonal, Validators.required),
			airedStart: this.formBuilder.control(new Date(), Validators.required),
			airedEnd: this.formBuilder.control(new Date(), Validators.required),
			imageFile: this.formBuilder.control('', Validators.required),
			youtubeTrailerId: this.formBuilder.control('', Validators.required),
			genres: this.formBuilder.control([]),
			studios: this.formBuilder.control([]),
		});
	}
}
