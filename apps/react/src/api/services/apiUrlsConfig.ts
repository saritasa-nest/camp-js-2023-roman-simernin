import { CONFIG } from '../config';

export namespace AppUrlsConfig {

	const { apiUrl } = CONFIG;

	/** Auth-related routes. */
	export const auth = {
		login: toApi('auth/login/'),
		refresh: toApi('auth/token/refresh/'),
	} as const;

	/**
	 * Provides it is url for authentication request.
	 * @param url - Url.
	 */
	export function isAuthUrl(url: string) {
		return Object.values(auth).some(path => url.endsWith(path));
	}

	/**
	 * Build api url.
	 * @param args - Url segments.
	 */
	function toApi(...args: readonly string[]): string {
		const path = args.join('/');
		return new URL(path, apiUrl).toString();
	}
}
