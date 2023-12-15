import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
	AnimeMultipleAutocompleteService,
	animeMultipleAutocompleteGroups,
} from '@js-camp/angular/core/services/anime-multiple-autocomplete.service';
import { MultipleAutocompleteService } from '@js-camp/angular/core/services/multiple-autocomplete.service';
import { AnimeType } from '@js-camp/core/models/anime/anime';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { AnimeRating } from '@js-camp/core/models/anime/anime-rating';
import { AnimeSeason } from '@js-camp/core/models/anime/anime-season';
import { AnimeSource } from '@js-camp/core/models/anime/anime-source';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
import { ImageFile } from '@js-camp/core/models/image-file';
import { MultipleAutocompleteItem } from '@js-camp/core/models/multiple-autocomplete-item';
import { EnumUtils } from '@js-camp/core/utils/enum.utils';

/** Anime management form controls. */
interface AnimeManagementFormControls {
	/** Title in English. */
	readonly englishTitle: FormControl<string>;

	/** Title in Japanese. */
	readonly japaneseTitle: FormControl<string>;

	/** Type. */
	readonly type: FormControl<AnimeType>;

	/** Status. */
	readonly status: FormControl<AnimeStatus>;

	/** Provides anime is airing. */
	readonly isAiring: FormControl<boolean>;

	/** Description. */
	readonly description: FormControl<string>;

	/** Age rating. */
	readonly ageRating: FormControl<AnimeRating>;

	/** Source. */
	readonly source: FormControl<AnimeSource>;

	/** Season. */
	readonly season: FormControl<AnimeSeason>;

	/** Aired start date. */
	readonly airedStart: FormControl<Date>;

	/** Aired end date. */
	readonly airedEnd: FormControl<Date>;

	/** Image file. */
	readonly imageFile: FormControl<ImageFile>;

	/** Youtube trailer id. */
	readonly youtubeTrailerId: FormControl<string>;

	/** Genres. */
	readonly genres: FormControl<MultipleAutocompleteItem[]>;

	/** Genres. */
	readonly studios: FormControl<MultipleAutocompleteItem[]>;
}

/** Anime form component. */
@Component({
	selector: 'camp-anime-form',
	templateUrl: './anime-form.component.html',
	styleUrls: ['./anime-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: MultipleAutocompleteService,
			useClass: AnimeMultipleAutocompleteService,
		},
	],
})
export class AnimeFormComponent implements OnInit {
	/** Anime form data. */
	@Input()
	public animeFormData: AnimeFormData | null = null;

	/** Submit event. */
	@Output()
	public readonly submitEvent = new EventEmitter<AnimeFormData>();

	private readonly formBuilder = inject(NonNullableFormBuilder);

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

	/** Multiple autocomplete groups. */
	protected get multipleAutocompleteGroups(): typeof animeMultipleAutocompleteGroups {
		return animeMultipleAutocompleteGroups;
	}

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
