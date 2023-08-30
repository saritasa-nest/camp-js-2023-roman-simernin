import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { catchApiError } from '@js-camp/angular/core/utils/rxjs/catch-api-error';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { HttpStatusCode } from 'axios';
import { Observable, map, of, switchMap } from 'rxjs';

/** Anime details component. */
@Component({
	selector: 'anime-details',
	templateUrl: './anime-details.component.html',
	styleUrls: ['./anime-details.component.css'],
})
export class AnimeDetailsComponent {

	private readonly animeService = inject(AnimeService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	/** Anime details stream. */
	protected readonly animeDetails$: Observable<AnimeDetails | null>;

	public constructor() {
		this.animeDetails$ = this.activatedRoute.params.pipe(
			map(({ id }) => Number(id)),
			switchMap(id => this.animeService.getAnimeById(id)),
			catchApiError((apiError, throwApiError$) => apiError.statusCode === HttpStatusCode.NotFound ?
				of(this.catchAnimeNotFound()) :
				throwApiError$),
		);
	}

	private catchAnimeNotFound(): null {
		this.router.navigate(['not-found']);

		return null;
	}
}
