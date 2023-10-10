import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { AnimeManagement } from '@js-camp/core/models/anime/anime-management';

/** Anime creation component. */
@Component({
	selector: 'camp-anime-creation',
	templateUrl: './anime-creation.component.html',
	styleUrls: ['./anime-creation.component.css'],
})
export class AnimeCreationComponent {

	private readonly animeService = inject(AnimeService);

	private readonly destroyRef = inject(DestroyRef);

	/**
	 * Create anime.
	 * @param animeManagement - Anime management model.
	 * */
	protected createAnime(animeManagement: AnimeManagement): void {
		this.animeService.createAnime(animeManagement).pipe(
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}
}
