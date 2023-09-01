import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '@js-camp/core/models/api-error';
import { ApiErrorDto } from '@js-camp/core/dtos/api-error.dto';

/**
 * Wrap catchError to catch error in api format.
 * @param errorHandler - Error handler.
 */
export function catchApiError<TInput, TOutput>(
	errorHandler: (error: ApiError, throwApiError$: Observable<never>, caugth$: Observable<TInput>) => Observable<TOutput>,
): OperatorFunction<TInput, TInput | TOutput> {
	return catchError((response: unknown, caugth$) => {
		const throwApiError$ = throwError(() => response);

		if (response instanceof HttpErrorResponse && isApiErrorReponse(response)) {
			const apiErrorDto = response.error as ApiErrorDto;

			const apiError: ApiError = {
				statusCode: response.status,
				errorMessages: apiErrorDto.errors.map(error => error.detail),
			};

			return errorHandler(apiError, throwApiError$, caugth$);
		}

		return throwApiError$;
	});
}

/**
 * Check this response has api error.
 * @param response - Response.
 */
function isApiErrorReponse(response: HttpErrorResponse): boolean {
	return Array.isArray(response.error.errors) &&
		typeof (response.error.type) === 'string';
}
