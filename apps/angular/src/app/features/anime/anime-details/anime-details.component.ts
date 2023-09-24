import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { Observable, map, switchMap, tap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AnimeCoverModalComponent, AnimeCoverModalParameters } from './anime-cover-modal/anime-cover-modal.component';

/** Anime details component. */
@Component({
	selector: 'camp-anime-details',
	templateUrl: './anime-details.component.html',
	styleUrls: ['./anime-details.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent {

	private readonly animeService = inject(AnimeService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly dialog = inject(MatDialog);

	private readonly sanitizer = inject(DomSanitizer);

	/** Anime details stream. */
	protected readonly animeDetails$: Observable<AnimeDetails | null>;

	public constructor() {
		this.animeDetails$ = this.activatedRoute.params.pipe(
			map(({ id }) => Number(id)),
			switchMap(id => this.animeService.getAnimeById(id)),
			tap(animeDetails => this.excludeAnimeNotFound(animeDetails)),
		);
	}

	/**
	 * Open full size anime image.
	 * @param imageUrl Image url.
	 */
	protected openFullSizeImage(imageUrl: string): void {
		const imageModalParameters: AnimeCoverModalParameters = { imageUrl };

		this.dialog.open(AnimeCoverModalComponent, { data: imageModalParameters });
	}

	/**
	 * Make youtube trailer url.
	 * @param youtubeTrailerId - Youtube trailer id.
	 */
	protected makeYoutubeTrailerUrl(youtubeTrailerId: string): SafeResourceUrl {
		const youtubeTrailerUrl = `https://www.youtube.com/embed/${youtubeTrailerId}`;

		return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeTrailerUrl);
	}

	private excludeAnimeNotFound(animeDetails: AnimeDetails | null): void {
		const isAnimeNotFound = animeDetails === null;

		if (isAnimeNotFound) {
			this.router.navigate(['not-found']);
		}
	}
}
