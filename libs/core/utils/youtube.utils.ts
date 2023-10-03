export namespace YoutubeUtils {
	const embeddedUrl = 'https://www.youtube.com/embed/';

	/**
		* Make embedded url.
		* @param id - Video id.
	 */
	export function makeEmbeddedUrl(id: string): string {
		return embeddedUrl + id;
	}
}
