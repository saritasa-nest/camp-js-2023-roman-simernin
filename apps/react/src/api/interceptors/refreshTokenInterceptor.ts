import { catchApiError } from '@js-camp/react/utils/catchApiError';
import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { store } from '@js-camp/react/store';
import { logout } from '@js-camp/react/store/auth/dispatchers';

import { AuthService } from '../services/authService';
import { http } from '..';
import { AppUrlsConfig } from '../services/apiUrlsConfig';

/**
 * Interceptor to refresh token.
 * @param error - Api error.
 */
export async function refreshTokenInterceptor(error: AxiosError): Promise<AxiosResponse<unknown, unknown>> {
	const { config } = error;

	if (config === undefined ||
		config.url === undefined ||
		AppUrlsConfig.isAuthUrl(config.url)) {
		throw error;
	}

	catchApiError(error, apiError => {
		if (apiError.statusCode !== HttpStatusCode.Unauthorized) {
			throw error;
		}
	});

	await refreshAccessToken();

	return http.request(config);
}

/** Refresh token. */
async function refreshAccessToken(): Promise<void> {
	try {
		await AuthService.refreshAccessToken();
	} catch (error: unknown) {
		store.dispatch(logout());
		throw error;
	}
}
