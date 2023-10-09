import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime/anime';
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
	readonly type: FormControl<AnimeType | null>;

	/** Status. */
	readonly status: FormControl<AnimeStatus | null>;

	/** Provides anime is airing. */
	readonly isAiring: FormControl<boolean>;

	/** Description. */
	readonly description: FormControl<string>;

	/** Age rating. */
	readonly ageRating: FormControl<AnimeRating | null>;

	/** Source. */
	readonly source: FormControl<AnimeSource | null>;

	/** Season. */
	readonly season: FormControl<AnimeSeason | null>;
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

	public constructor() {
		this.formGroup = this.formBuilder.group({
			englishTitle: ['', [Validators.required]],
			japaneseTitle: ['', [Validators.required]],
			type: [null as AnimeType | null, [Validators.required]],
			status: [null as AnimeStatus | null, [Validators.required]],
			isAiring: [false, [Validators.required]],
			description: ['', [Validators.required]],
			ageRating: [null as AnimeRating | null, [Validators.required]],
			source: [null as AnimeSource | null, [Validators.required]],
			season: [null as AnimeSeason | null, [Validators.required]],
		});
	}

	/**
	 * Track by index.
	 * @param index Item index.
	 */
	protected trackByIndex(index: number): number {
		return index;
	}
}
