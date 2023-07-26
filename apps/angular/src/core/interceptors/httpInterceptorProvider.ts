import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyHeaderInterceptor } from './apiKeyHeaderInterceptor';

/** Http interceptors in outside-in order. */
export const httpInterceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyHeaderInterceptor, multi: true }];
