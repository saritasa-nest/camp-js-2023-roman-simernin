import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { xml2js } from 'xml-js';

import { S3ParamsRequestDto } from '@js-camp/core/dtos/s3/s3-params-request.dto';
import { S3ParamsResponseDto } from '@js-camp/core/dtos/s3/s3-params-response.dto';
import { ImageFileType } from '@js-camp/core/models/s3/image-file-type';
import { ImageFileTypeMapper } from '@js-camp/core/mappers/s3/image-file-type.mapper';
import { S3UploadResponse } from '@js-camp/core/dtos/s3/s3-upload-response.dto';

import { ApiUriBuilder } from './api-uri-builder';

/** S3 service. */
@Injectable({
	providedIn: 'root',
})
export class ImageFileService {

	private readonly http = inject(HttpClient);

	private readonly apiUriBuilder = inject(ApiUriBuilder);

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
		}).pipe(
			switchMap(s3ParamsResponse => this.saveImageFileInS3(s3ParamsResponse, imageFile)),
			map(s3UploadResponse => s3UploadResponse.PostResponse.Location._text),
		);
	}

	private getS3Params(s3ParamsRequest: S3ParamsRequestDto): Observable<S3ParamsResponseDto> {
		const uri = this.apiUriBuilder.buildS3ParamsUri();

		return this.http.post<S3ParamsResponseDto>(uri, s3ParamsRequest);
	}

	private saveImageFileInS3(s3ParamsResponse: S3ParamsResponseDto, imageFile: File): Observable<S3UploadResponse> {
		const formData = new FormData();

		for (const key in s3ParamsResponse) {
			formData.append(key, s3ParamsResponse[key as keyof S3ParamsResponseDto]);
		}
		formData.append('file', imageFile);
		formData.delete('form_action');

		return this.http.post(s3ParamsResponse.form_action, formData, { responseType: 'text' }).pipe(
			map(s3Response => (xml2js(s3Response, { compact: true }) as S3UploadResponse)),
		);
	}
}
