import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeFormService } from '@js-camp/angular/core/services/anime-form.service';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { Observable, map, switchMap, tap } from 'rxjs';

/** Anime editing component. */
@Component({
	selector: 'camp-anime-editing',
	templateUrl: './anime-editing.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditingComponent {

	private readonly destroyRef = inject(DestroyRef);

	private readonly router = inject(Router);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly animeFormService = inject(AnimeFormService);

	/** Anime id stream. */
	protected readonly animeId$: Observable<number>;

	/** Anime management stream. */
	protected readonly animeFormData$: Observable<AnimeFormData>;

	public constructor() {
		this.animeId$ = this.activatedRoute.params.pipe(
			map(({ id }) => Number(id)),
		);

		this.animeFormData$ = this.animeId$.pipe(
			switchMap(id => this.animeFormService.getAnimeFormData(id)),
		);
	}

	/**
	 * Edit anime.
	 * @param formData - Anime form data.
	 * */
	protected editAnime(formData: AnimeFormData): void {
		this.animeId$.pipe(
			switchMap(id => this.animeFormService.editAnime(id, formData)),
			tap(id => this.router.navigate(['/anime', id])),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}
}
