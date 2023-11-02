import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { GenreService } from '@js-camp/angular/core/services/genre-service';
import { ImageFileService } from '@js-camp/angular/core/services/image-file.service';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { ImageFileType } from '@js-camp/core/models/s3/image-file-type';
import { Observable, forkJoin, from, map, mergeMap, of, switchMap, tap, toArray } from 'rxjs';

/** Anime creation component. */
@Component({
	selector: 'camp-anime-creation',
	templateUrl: './anime-creation.component.html',
	styleUrls: ['./anime-creation.component.css'],
})
export class AnimeCreationComponent {

	private readonly animeService = inject(AnimeService);

	private readonly genreService = inject(GenreService);

	private readonly imageFileService = inject(ImageFileService);

	private readonly destroyRef = inject(DestroyRef);

	private readonly router = inject(Router);

	/**
	 * Create anime.
	 * @param formData - Anime form data.
	 * */
	protected createAnime(formData: AnimeFormData): void {
		forkJoin({
			genreIds$: this.getGenreIds(formData),
			imageUrl$: this.saveImage(formData),
		}).pipe(
			switchMap(({ genreIds$: genreIds, imageUrl$: imageUrl }) => this.animeService.createAnime({
				...formData,
				genreIds,
				imageUrl,
			})),
			tap(id => this.router.navigate(['anime', id])),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}

	private getGenreIds(formData: AnimeFormData): Observable<number[]> {
		const existingGenresIds = formData.genres
			.map(genre => genre.id)
			.filter((genreId): genreId is number => genreId !== null); 

		const genresToCreate = formData.genres
			.filter(genre => genre.id === null);

		if (genresToCreate.length === 0) {
			return of(existingGenresIds);
		}

		return from(genresToCreate).pipe(
			mergeMap(genreToCreate => this.genreService.createGenre(genreToCreate.name)),
			toArray(),
			map(createdGenreIds => createdGenreIds.concat(existingGenresIds)),
		);
	}

	private saveImage(formData: AnimeFormData): Observable<string> {
		const imageFileSource = formData.imageFile.source;

		if (imageFileSource instanceof File) {
			return this.imageFileService.addToStorage(imageFileSource, ImageFileType.AnimeImage);
		}

		throw new Error('Image file source for anime creation must be File.');
	}
}
