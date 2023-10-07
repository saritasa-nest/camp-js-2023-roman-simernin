import { AppError } from './app-error';

/** Not found error. */
export class NotFoundError extends AppError {

	public constructor(resourceName: string) {
		const errorMessage = `Not found ${resourceName}`;
		super([errorMessage]);
	}
}
