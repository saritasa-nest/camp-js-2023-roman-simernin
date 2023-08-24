import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokensStorageService } from '../services/tokens-storage.service';

/** Interceptor for adding access token to request. */
@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

	public constructor(
		private readonly tokensStorageService: TokensStorageService,
	) {

	}

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const tokens = this.tokensStorageService.get();

		return next.handle(tokens === null ? request : request.clone({
			headers: request.headers.append('Authorization', `Bearer ${tokens.accessToken}`),
		}));
	}
}
