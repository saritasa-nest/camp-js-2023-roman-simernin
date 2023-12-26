/** Application error. */
export class AppError extends Error {

	/** Error messages. */
	public readonly errorMessages: string[];

	public constructor(errorMessages: string[]) {
		super();
		super.message = errorMessages.toString();
		this.errorMessages = errorMessages;
	}
}
