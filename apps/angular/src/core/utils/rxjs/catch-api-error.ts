import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '@js-camp/core/models/api-error';
import { ApiErrorDto } from '@js-camp/core/dtos/api-error.dto';
import { AppErrorMapper } from '@js-camp/core/mappers/app-error.mapper';

/**
 * Wrap catchError to catch error in api format.
 * @param errorHandler - Error handler.
 */
export function catchApiError<TInput, TOutput>(
	errorHandler: (error: ApiError, throwApiError$: Observable<never>, caugth$: Observable<TInput>) => Observable<TOutput>,
): OperatorFunction<TInput, TInput | TOutput> {
	return catchError((response: unknown, caugth$) => {
		const throwApiError$ = throwError(() => response);

		if (response instanceof HttpErrorResponse) {
			const responseError = response.error;

			if (isApiError(responseError)) {
				const apiError: ApiError = {
					statusCode: response.status,
					errorMessages: responseError.errors.map(error => error.detail),
				};

				return errorHandler(apiError, throwApiError$, caugth$);
			}
		}

		return throwApiError$;
	});
}

/**
 * Api error handler for application.
 * @param apiError - Api error.
 * */
export function applicationApiErrorHandler(apiError: ApiError): Observable<void> {
	const appError = AppErrorMapper.fromApiError(apiError);
	return throwError(() => appError);
}

/**
 * Check this response has api error.
 * @param error - Possible api error.
 */
function isApiError(error: unknown): error is ApiErrorDto {
	const apiError = error as ApiErrorDto;

	return apiError.type !== undefined && apiError.errors !== undefined;
}
