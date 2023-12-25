import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

import { S3ParamsRequestDto } from '@js-camp/core/dtos/s3/s3-params-request.dto';
import { S3ParamsResponseDto } from '@js-camp/core/dtos/s3/s3-params-response.dto';
import { ImageFileType } from '@js-camp/core/models/s3/image-file-type';
import { ImageFileTypeMapper } from '@js-camp/core/mappers/s3/image-file-type.mapper';

import { ApiUrlBuilder } from './api-url-builder';

/** S3 service. */
@Injectable({
	providedIn: 'root',
})
export class ImageFileService {
	private readonly http = inject(HttpClient);

	private readonly apiUrlBuilder = inject(ApiUrlBuilder);

	/**
	 * Add image file to storage.
	 * @param imageFile - Image file.
	 * @param imageFileType - Image file type.
	 * @returns - Image file url in storage.
	 */
	public addToStorage(imageFile: File, imageFileType: ImageFileType): Observable<string> {
		return this.getS3Params({
			filename: imageFile.name,
			dest: ImageFileTypeMapper.toDto(imageFileType),
		}).pipe(switchMap(s3ParamsResponse => this.saveImageFileInS3(s3ParamsResponse, imageFile)));
	}

	private getS3Params(s3ParamsRequest: S3ParamsRequestDto): Observable<S3ParamsResponseDto> {
		const url = this.apiUrlBuilder.buildS3ParamsUrl();

		return this.http.post<S3ParamsResponseDto>(url, s3ParamsRequest);
	}

	private saveImageFileInS3(s3ParamsResponse: S3ParamsResponseDto, imageFile: File): Observable<string> {
		const formData = new FormData();

		for (const key in s3ParamsResponse) {
			formData.append(key, s3ParamsResponse[key as keyof S3ParamsResponseDto]);
		}
		formData.append('file', imageFile);
		formData.delete('form_action');

		return this.http
			.post(s3ParamsResponse.form_action, formData, { responseType: 'text' })
			.pipe(map(s3Response => this.parseImageUrl(s3Response)));
	}

	private parseImageUrl(s3Response: string): string {
		const xmlResponse = new DOMParser().parseFromString(s3Response, 'text/xml');
		const locationTag = xmlResponse.getElementsByTagName('Location').item(0);
		return locationTag?.textContent ?? '';
	}
}
