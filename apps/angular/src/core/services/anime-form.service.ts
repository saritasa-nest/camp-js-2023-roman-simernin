import { Injectable, inject } from '@angular/core';
import { GenreService } from '@js-camp/angular/core/services/genre-service';
import { ImageFileService } from '@js-camp/angular/core/services/image-file.service';
import { StudioService } from '@js-camp/angular/core/services/studio.service';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { ImageFileType } from '@js-camp/core/models/s3/image-file-type';
import { Observable, from, map, mergeMap, of, toArray } from 'rxjs';

/** Anime form service. */
@Injectable()
export class AnimeFormService {

	private readonly genreService = inject(GenreService);

	private readonly studioService = inject(StudioService);

	private readonly imageFileService = inject(ImageFileService);

	/**
		* Create or get exising genres.
		* @param formData - Anime form data.
		* @returns Genre ids.
		*/
	public createOrGetGenres(formData: AnimeFormData): Observable<number[]> {
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

	/**
		* Create or get exising studios.
		* @param formData - Anime form data.
		* @returns Studio ids.
		*/
	public createOrGetStudios(formData: AnimeFormData): Observable<number[]> {
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

	/**
		* Add or get image.
		* @param formData - Anime form data.
		* @returns Image url.
		*/
	public addOrGetImage(formData: AnimeFormData): Observable<string> {
		if (formData.imageFile instanceof File) {
			return this.imageFileService.addToStorage(formData.imageFile, ImageFileType.AnimeImage);
		}

		return of(formData.imageFile);
	}
}
