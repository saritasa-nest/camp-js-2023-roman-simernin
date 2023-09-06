import { ApiError } from '../models/api-error';
import { AppError } from '../models/app-error';

export namespace AppErrorMapper {

	/**
	 * Maps dto to model.
	 * @param apiError Api error.
	 */
	export function fromApiError(apiError: ApiError): AppError {
		return new AppError(apiError.errorMessages);
	}
}
