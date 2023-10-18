/** DTO for s3 uploading response.  */
export interface S3UploadResponse {

	/** Post response. */
	readonly PostResponse: {

		/** Location. */
		readonly Location: {

			/** Image URL. */
			readonly _text: string;
		};
	};
}
