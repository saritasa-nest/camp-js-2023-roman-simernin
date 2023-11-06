import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeFormService } from '@js-camp/angular/core/services/anime-form.service';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { AnimeFormDataMapper } from '@js-camp/core/mappers/anime/anime-form-data.mapper';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';

/** Anime editing component. */
@Component({
	selector: 'camp-anime-editing',
	templateUrl: './anime-editing.component.html',
	styleUrls: ['./anime-editing.component.css'],
})
export class AnimeEditingComponent {

	private readonly animeService = inject(AnimeService);

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
			switchMap(id => this.animeService.getAnimeById(id)),
			map(animeDetails => AnimeFormDataMapper.fromDetails(animeDetails)),
		);
	}

	/**
	 * Edit anime.
	 * @param formData - Anime form data.
	 * */
	protected editAnime(formData: AnimeFormData): void {
		forkJoin({
			animeId$: this.animeId$,
			genreIds$: this.animeFormService.createOrGetGenres(formData),
			studioIds$: this.animeFormService.createOrGetStudios(formData),
			imageUrl$: this.animeFormService.addOrGetImage(formData),
		}).pipe(
			switchMap(({ 
				animeId$: animeId,
				genreIds$: genreIds,
				studioIds$: studioIds,
				imageUrl$: imageUrl,
			}) => this.animeService.editAnime(animeId, {
				...formData,
				genreIds,
				studioIds,
				imageUrl,
			})),
			tap(id => this.router.navigate(['/anime', id])),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}
}
