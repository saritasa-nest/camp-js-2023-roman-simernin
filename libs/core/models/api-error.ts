/** Api error. */
export interface ApiError {

	/** Status code. */
	readonly statusCode: number;

	/** Error messages. */
	readonly errorMessages: readonly string[];
}
