import axios from 'axios';

import { CONFIG } from './config';
import { accessTokenInterceptor } from './interceptors/accessTokenInterceptor';
import { refreshTokenInterceptor } from './interceptors/refreshTokenInterceptor';

export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});

http.interceptors.request.use(config => accessTokenInterceptor(config),
	error => Promise.reject(error));

http.interceptors.response.use(response => response,
	error => refreshTokenInterceptor(error));
