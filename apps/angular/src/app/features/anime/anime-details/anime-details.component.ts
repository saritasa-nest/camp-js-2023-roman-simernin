import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, map, switchMap } from 'rxjs';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';
import { catchAppError } from '@js-camp/angular/core/utils/rxjs/catch-app.error';
import { AppError } from '@js-camp/core/models/app-error';
import { NotFoundError } from '@js-camp/core/models/not-found-error';
import { ConfirmationModalComponent, ConfirmationModalParameters } from '@js-camp/angular/shared/components/confirmation-modal/confirmation-modal.component';

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

	/** Anime details stream. */
	protected readonly animeDetails$: Observable<AnimeDetails>;

	public constructor() {
		this.animeDetails$ = this.activatedRoute.params.pipe(
			map(({ id }) => Number(id)),
			switchMap(id => this.animeService.getAnimeById(id)),
			catchAppError(appError => this.catchAnimeGettingError(appError)),
		);
	}

	/**
	 * Open full size anime image.
	 * @param imageUrl Image url.
	 */
	protected openFullSizeImage(imageUrl: string): void {
		this.dialog.open<AnimeCoverModalComponent, AnimeCoverModalParameters, void>(
			AnimeCoverModalComponent,
			{ data: { imageUrl } },
		);
	}

	/**
	 * Delete anime with confirmaion.
	 * @param id - Anime id.
	*/
	protected deleteAnime(id: number): void {
		const confirmationModalParameters: ConfirmationModalParameters = {
			confirmationText: 'Are you sure you want to delete this anime?',
		};

		this.dialog.open(ConfirmationModalComponent, { data: confirmationModalParameters });
	}

	private catchAnimeGettingError(appError: AppError): Observable<never> {
		if (appError instanceof NotFoundError) {
			this.router.navigate(['not-found']);
		} else {
			this.router.navigate(['']);
		}

		return EMPTY;
	}
}
