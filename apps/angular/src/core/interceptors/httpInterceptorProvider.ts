import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyHeaderInterceptor } from './apiKeyHeaderInterceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyHeaderInterceptor, multi: true },
];