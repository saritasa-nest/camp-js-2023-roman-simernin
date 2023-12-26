import { InternalAxiosRequestConfig } from 'axios';

import { AppUrlsConfig } from '../services/apiUrlsConfig';
import { UserAccessTokenStorageService } from '../services/userAccessTokenStorageService';

/**
 * Interceptor set access token to request.
 * @param config Request config.
 */
export function accessTokenInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
	if (config.url === undefined || AppUrlsConfig.isAuthUrl(config.url)) {
		return config;
	}

	const tokens = UserAccessTokenStorageService.get();

	if (tokens === null) {
		return config;
	}

	config.headers.set('Authorization', `Bearer ${tokens.accessToken}`);

	return config;
}
