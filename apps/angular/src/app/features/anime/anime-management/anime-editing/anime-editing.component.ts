import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime-service';
import { GenreService } from '@js-camp/angular/core/services/genre-service';
import { ImageFileService } from '@js-camp/angular/core/services/image-file.service';
import { StudioService } from '@js-camp/angular/core/services/studio.service';
import { AnimeFormDataMapper } from '@js-camp/core/mappers/anime/anime-form-data.mapper';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { ImageFileType } from '@js-camp/core/models/s3/image-file-type';
import { Observable, forkJoin, from, map, mergeMap, of, switchMap, tap, toArray } from 'rxjs';

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

	private readonly genreService = inject(GenreService);

	private readonly studioService = inject(StudioService);

	private readonly imageFileService = inject(ImageFileService);

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
			genreIds$: this.getGenreIds(formData),
			studioIds$: this.getStudioIds(formData),
			imageUrl$: this.saveImage(formData),
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

	private getStudioIds(formData: AnimeFormData): Observable<number[]> {
		const existingStudioIds = formData.studios
			.map(studio => studio.id)
			.filter((studio): studio is number => studio !== null); 

		const studiosToCreate = formData.studios
			.filter(studio => studio.id === null);

		if (studiosToCreate.length === 0) {
			return of(existingStudioIds);
		}

		return from(studiosToCreate).pipe(
			mergeMap(studioToCreate => this.studioService.createStudio(studioToCreate.name)),
			toArray(),
			map(createdStudioIds => createdStudioIds.concat(existingStudioIds)),
		);
	}

	private saveImage(formData: AnimeFormData): Observable<string> {
		const imageFileSource = formData.imageFile.source;

		if (imageFileSource === null) {
			throw new Error('Image file source for anime updating can not br equal null.');
		}

		if (imageFileSource instanceof File) {
			return this.imageFileService.addToStorage(imageFileSource, ImageFileType.AnimeImage);
		}

		return of(imageFileSource);
	}
}
