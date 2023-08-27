import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { catchApiError } from '../utils/rxjs/catch-api-error';
import { TokensStorageService } from '../services/tokens-storage.service';
import { ApiUriBuilder } from '../services/api-uri-builder';

/** Interceptor for request authentication. */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

	public constructor(
		private readonly authService: AuthService,
		private readonly tokensStorageService: TokensStorageService,
		private readonly apiUriBuilder: ApiUriBuilder,
	) {

	}

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this.isAuthenticationRequest(request)) {
			return next.handle(request);
		}

		const authenticatedRequest = this.addAuthentication(request);

		return next.handle(authenticatedRequest).pipe(
			catchApiError((apiError, throwApiError)=> apiError.statusCode !== HttpStatusCode.Unauthorized ?
				throwApiError :
				this.refreshToken(request).pipe(
					switchMap(refreshedRequest => next.handle(refreshedRequest)),
				)),
		);
	}

	private isAuthenticationRequest(request: HttpRequest<unknown>): boolean {
		return request.url === this.apiUriBuilder.buildLoginUri() ||
			request.url === this.apiUriBuilder.buildRefreshUri();
	}

	private addAuthentication(request: HttpRequest<unknown>): HttpRequest<unknown> {
		const tokens = this.tokensStorageService.get();

		return tokens === null ? request : request.clone({
			headers: request.headers.append('Authorization', `Bearer ${tokens.accessToken}`),
		});
	}

	private refreshToken(request: HttpRequest<unknown>): Observable<HttpRequest<unknown>> {
		return this.authService.refreshAccessToken().pipe(
			map(_ => this.addAuthentication(request)),
			catchApiError((_, throwApiError) => {
				this.authService.logout();

				return throwApiError;
			}),
		);
	}
}
