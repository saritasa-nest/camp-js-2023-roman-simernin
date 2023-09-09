/** Application error. */
export class AppError extends Error {

	/** Error messages. */
	public readonly errorMessages: readonly string[];

	public constructor(errorMessages: readonly string[]) {
		super();
		this.errorMessages = errorMessages;
	}
}
