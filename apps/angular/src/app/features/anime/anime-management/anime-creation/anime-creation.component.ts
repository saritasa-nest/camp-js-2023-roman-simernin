import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AnimeFormService } from '@js-camp/angular/core/services/anime-form.service';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { forkJoin, switchMap, tap } from 'rxjs';

/** Anime creation component. */
@Component({
	selector: 'camp-anime-creation',
	templateUrl: './anime-creation.component.html',
})
export class AnimeCreationComponent {

	private readonly animeService = inject(AnimeService);

	private readonly animeFormService = inject(AnimeFormService);

	private readonly destroyRef = inject(DestroyRef);

	private readonly router = inject(Router);

	/**
	 * Create anime.
	 * @param formData - Anime form data.
	 * */
	protected createAnime(formData: AnimeFormData): void {
		forkJoin({
			genreIds$: this.animeFormService.createOrGetGenres(formData),
			studioIds$: this.animeFormService.createOrGetStudios(formData),
			imageUrl$: this.animeFormService.addOrGetImage(formData),
		}).pipe(
			switchMap(({ genreIds$: genreIds, studioIds$: studioIds, imageUrl$: imageUrl }) => this.animeService.createAnime({
				...formData,
				genreIds,
				studioIds,
				imageUrl,
			})),
			tap(id => this.router.navigate(['anime', id])),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}
}
