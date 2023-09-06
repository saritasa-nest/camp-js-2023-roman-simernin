/** Application error. */
export class AppError {

	/** Error messages. */
	public readonly errorMessages: readonly string[];

	public constructor(errorMessages: readonly string[]) {
		this.errorMessages = errorMessages;
	}
}
