import { ApiErrorDto } from '@js-camp/core/dtos/api-error.dto';
import { AppErrorMapper } from '@js-camp/core/mappers/app-error.mapper';
import { ApiError } from '@js-camp/core/models/api-error';
import { AxiosError } from 'axios';

/**
 * @param error Catch api error.
 * @param handler - Api error handler.
 */
export function catchApiError(error: unknown, handler: (apiError: ApiError) => void): void {
	if (!(error instanceof AxiosError)) {
		console.warn('It is not axios error.');
		return;
	}

	if (error?.response === undefined) {
		console.warn('Axios response is not defined');
		return;
	}

	const apiErrorDto = error.response.data;

	if (!isApiError(apiErrorDto)) {
		console.warn('It is not api error response.');
		return;
	}

	const apiError: ApiError = {
		statusCode: error.response.status,
		errorMessages: apiErrorDto.errors.map(errorWithMessage => errorWithMessage.detail),
	};

	return handler(apiError);
}

/**
 * Throw api error.
 * @param apiError - Api error.
 */
export function throwAppError(apiError: ApiError): void {
	const appError = AppErrorMapper.fromApiError(apiError);

	throw appError;
}

/**
 * Check this response has api error.
 * @param error - Possible api error.
 */
function isApiError(error: unknown): error is ApiErrorDto {
	const apiError = error as ApiErrorDto;

	return 'type' in apiError && 'errors' in apiError;
}
