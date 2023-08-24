import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyHeaderInterceptor } from './api-key-header.interceptor';
import { AccessTokenInterceptor } from './access-token.interceptor';

/** Http interceptors in outside-in order. */
export const httpInterceptorProvider = [
	{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyHeaderInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: AccessTokenInterceptor, multi: true },
];
