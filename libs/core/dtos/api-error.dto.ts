/** DTO for api error. */
export interface ApiErrorDto {

	/** Error type.*/
	readonly type: string;

	/** Error messages. */
	readonly errors: readonly ApiErrorMessageDto[];
}

/** DTO for api error message. */
export interface ApiErrorMessageDto {

	/** Error message code. */
	readonly code: string;

	/** Error message details. */
	readonly detail: string;
}
