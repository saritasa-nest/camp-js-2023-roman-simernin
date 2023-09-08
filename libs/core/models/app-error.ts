/** Application error. */
export class AppError extends Error {

	/** Error messages. */
	public readonly errorMessages: readonly string[];

	public constructor(errorMessages: readonly string[]) {
		super();
		this.errorMessages = errorMessages;
	}
}

/**
 * Check error is application error.
 * @param error - Error.
 * */
export function isAppError(error: unknown): error is AppError {
	return error instanceof AppError;
}
