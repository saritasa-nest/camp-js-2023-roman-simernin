import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { AnimeManagementMapper } from '@js-camp/core/mappers/anime/anime-management.mapper';
import { AnimeManagement } from '@js-camp/core/models/anime/anime-management';
import { Observable, map, switchMap, tap } from 'rxjs';

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

	/** Anime id stream. */
	protected readonly animeId$: Observable<number>;

	/** Anime management stream. */
	protected readonly animeManagement$: Observable<AnimeManagement>;

	public constructor() {
		this.animeId$ = this.activatedRoute.params.pipe(
			map(({ id }) => Number(id)),
		);

		this.animeManagement$ = this.animeId$.pipe(
			switchMap(id => this.animeService.getAnimeById(id)),
			map(animeDetails => AnimeManagementMapper.fromDetails(animeDetails)),
		);
	}

	/**
	 * Edit anime.
	 * @param animeManagement - Anime management model.
	 * */
	protected editAnime(animeManagement: AnimeManagement): void {
		this.animeId$.pipe(
			switchMap(id => this.animeService.editAnime(id, animeManagement)),
			tap(id => this.router.navigate(['/anime', id])),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}
}
