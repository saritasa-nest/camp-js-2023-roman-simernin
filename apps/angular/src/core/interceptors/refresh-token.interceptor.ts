import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

/** Interceptor for refreshing token to request. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

	public constructor(
		private readonly authService: AuthService,
	) {

	}

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse && (error as HttpErrorResponse).status === HttpStatusCode.Unauthorized) {
					return this.tryRefreshToken(request, next);
				}

				return throwError(() => error);
			}),
		);
	}

	private tryRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return this.authService.refreshAccessToken().pipe(
			switchMap(_ => next.handle(request)),
		);
	}
}
