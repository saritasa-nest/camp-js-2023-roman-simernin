import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject} from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime/anime';
import { AnimeManagement } from '@js-camp/core/models/anime/anime-management';
import { AnimeRating } from '@js-camp/core/models/anime/anime-rating';
import { AnimeSeason } from '@js-camp/core/models/anime/anime-season';
import { AnimeSource } from '@js-camp/core/models/anime/anime-source';
import { AnimeStatus } from '@js-camp/core/models/anime/anime-status';
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
}

/** Anime form component. */
@Component({
	selector: 'camp-anime-form',
	templateUrl: './anime-form.component.html',
	styleUrls: ['./anime-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeFormComponent {

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

	/** Anime management form group. */
	protected readonly formGroup: FormGroup<AnimeManagementFormControls>;

	/** Submit event. */
	@Output()
	public submitEvent = new EventEmitter<AnimeManagement>();

	public constructor() {
		this.formGroup = this.formBuilder.group({
			englishTitle: ['', [Validators.required]],
			japaneseTitle: ['', [Validators.required]],
			type: [AnimeType.Unknown, [Validators.required]],
			status: [AnimeStatus.NotYetAired, [Validators.required]],
			isAiring: [false, [Validators.required]],
			description: ['', [Validators.required]],
			ageRating: [AnimeRating.Unknown, [Validators.required]],
			source: [AnimeSource.Unknown, [Validators.required]],
			season: [AnimeSeason.NonSeasonal, [Validators.required]],
			airedStart: [new Date(), [Validators.required]],
			airedEnd: [new Date(), [Validators.required]],
		});
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

		this.submitEvent.emit({
			...formData,
			youtubeTrailerId: null,
		});
	}
}
