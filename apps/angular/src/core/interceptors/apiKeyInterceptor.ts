import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';

/** Interceptor for adding key to request.  */
@Injectable({
    providedIn: 'root'
})
export class ApiKeyInterceptor implements HttpInterceptor {

    /** @inheritdoc */
    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        request.headers.append('Api-Key', environment.apiKey);

        return next.handle(request);
    }
}