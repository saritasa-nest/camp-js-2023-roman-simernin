import { Injectable, inject } from '@angular/core';
import { GenreService } from '@js-camp/angular/core/services/genre-service';
import { ImageFileService } from '@js-camp/angular/core/services/image-file.service';
import { StudioService } from '@js-camp/angular/core/services/studio.service';
import { AnimeFormData } from '@js-camp/core/models/anime/anime-form-data';
import { ImageFileType } from '@js-camp/core/models/s3/image-file-type';
import { AnimeFormDataMapper } from '@js-camp/core/mappers/anime/anime-form-data.mapper';
import { Observable, combineLatest, forkJoin, from, map, mergeMap, of, switchMap, toArray } from 'rxjs';

import { AnimeService } from './anime-service';

/** Anime form service. */
@Injectable()
export class AnimeFormService {
	private readonly genreService = inject(GenreService);

	private readonly studioService = inject(StudioService);

	private readonly imageFileService = inject(ImageFileService);

	private readonly animeService = inject(AnimeService);

	/**
	 * Get anime form data.
	 * @param id - Anime id.
	 */
	public getAnimeFormData(id: number): Observable<AnimeFormData> {
		return this.animeService
			.getAnimeById(id)
			.pipe(map((animeDetails) => AnimeFormDataMapper.fromDetails(animeDetails)));
	}

	/**
	 * Create anime.
	 * @param formData - Anime form data.
	 * */
	public createAnime(formData: AnimeFormData): Observable<number> {
		return combineLatest([
			this.createGenres(formData),
			this.createStudios(formData),
			this.addImageToFileStorage(formData),
		]).pipe(
			switchMap(([genreIds, studioIds, imageUrl]) =>
				this.animeService.createAnime(AnimeFormDataMapper.toCreateData(formData, genreIds, studioIds, imageUrl))
			)
		);
	}

	/**
	 * Edit anime.
	 * @param id - Anime id.
	 * @param formData - Anime form data.
	 * */
	public editAnime(id: number, formData: AnimeFormData): Observable<number> {
		return combineLatest([
			this.createGenres(formData),
			this.createStudios(formData),
			this.addImageToFileStorage(formData),
		]).pipe(
			switchMap(([genreIds, studioIds, imageUrl]) =>
				this.animeService.editAnime(id, AnimeFormDataMapper.toEditData(formData, genreIds, studioIds, imageUrl))
			)
		);
	}

	/**
	 * Create genres.
	 * @param formData - Anime form data.
	 * @returns Genre ids.
	 */
	private createGenres(formData: AnimeFormData): Observable<number[]> {
		const existingGenresIds = formData.genres
			.map((genre) => genre.id)
			.filter((genreId): genreId is number => genreId !== null);

		const genresToCreate = formData.genres.filter((genre) => genre.id === null);

		if (genresToCreate.length === 0) {
			return of(existingGenresIds);
		}

		const genresToCreateRequests = genresToCreate.map((genreToCreate) =>
			this.genreService.createGenre(genreToCreate.name)
		);

		return forkJoin(genresToCreateRequests).pipe(map((createdGenreIds) => createdGenreIds.concat(existingGenresIds)));
	}

	/**
	 * Create studios.
	 * @param formData - Anime form data.
	 * @returns Studio ids.
	 */
	private createStudios(formData: AnimeFormData): Observable<number[]> {
		const existingStudioIds = formData.studios
			.map((studio) => studio.id)
			.filter((studio): studio is number => studio !== null);

		const studiosToCreate = formData.studios.filter((studio) => studio.id === null);

		if (studiosToCreate.length === 0) {
			return of(existingStudioIds);
		}

		const studiosToCreateRequests = studiosToCreate.map((studioToCreate) =>
			this.studioService.createStudio(studioToCreate.name)
		);

		return forkJoin(studiosToCreateRequests).pipe(
			map((createdStudioIds) => createdStudioIds.concat(existingStudioIds))
		);
	}

	/**
	 * Add image to file storage.
	 * @param formData - Anime form data.
	 * @returns Image url.
	 */
	private addImageToFileStorage(formData: AnimeFormData): Observable<string> {
		if (formData.imageFile instanceof File) {
			return this.imageFileService.addToStorage(formData.imageFile, ImageFileType.AnimeImage);
		}

		return of(formData.imageFile);
	}
}
