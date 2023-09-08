import { AppError } from '@js-camp/core/models/app-error';
import { MonoTypeOperatorFunction, ObservableInput, catchError, throwError } from 'rxjs';

/**
 * Wrap catchError to catch error in app format.
 * @param errorHandler - Error handler.
 */
export function catchAppError<T, V>(
	errorHandler: (error: AppError) => ObservableInput<V>,
): MonoTypeOperatorFunction<T | V> {
	return catchError((error: unknown) => {
		if (isAppError(error)) {
			return errorHandler(error);
		}
		return throwError(() => error);
	});
}

/**
 * Check error is application error.
 * @param error - Error.
 * */
function isAppError(error: unknown): error is AppError {
	return error instanceof AppError;
}
