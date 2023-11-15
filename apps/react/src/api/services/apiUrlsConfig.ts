export namespace AppUrlsConfig {

	const apiUrl = 'https://api.camp-js.saritasa.rocks/api/v1/';

	/** Auth-related routes. */
	export const auth = {
		login: toApi('auth/login/'),
	} as const;

	/**
		* Build api url.
		* @param args - Url segments.
  */
	function toApi(...args: readonly string[]): string {
		const path = args.join('/');
		return new URL(path, apiUrl).toString();
	}
}
