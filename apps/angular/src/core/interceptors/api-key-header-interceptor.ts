import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';

/** Interceptor for adding header for api key to request. */
@Injectable()
export class ApiKeyHeaderInterceptor implements HttpInterceptor {

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const requestWithApiKeyHeader = request.clone({
			headers: request.headers.append('Api-Key', environment.apiKey),
		});

		return next.handle(requestWithApiKeyHeader);
	}
}
