import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AnimeFormService } from '@js-camp/angular/core/services/anime-form.service';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { tap } from 'rxjs';

/** Anime creation component. */
@Component({
	selector: 'camp-anime-creation',
	templateUrl: './anime-creation.component.html',
})
export class AnimeCreationComponent {

	private readonly animeFormService = inject(AnimeFormService);

	private readonly destroyRef = inject(DestroyRef);

	private readonly router = inject(Router);

	/**
	 * Create anime.
	 * @param formData - Anime form data.
	 * */
	protected createAnime(formData: AnimeFormData): void {
		this.animeFormService.createAnime(formData).pipe(
			tap(id => this.router.navigate(['anime', id])),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}
}
