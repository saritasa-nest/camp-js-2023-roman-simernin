import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyHeaderInterceptor } from './api-key-header.interceptor';
import { AuthenticationInterceptor } from './authentication.interceptor';

/** Http interceptors in outside-in order. */
export const httpInterceptorProvider = [
	{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyHeaderInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
];
