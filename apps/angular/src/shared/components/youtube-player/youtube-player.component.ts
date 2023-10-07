import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeUtils } from '@js-camp/core/utils/youtube.utils';

/** Youtube player component. */
@Component({
	selector: 'camp-youtube-player',
	templateUrl: './youtube-player.component.html',
	styleUrls: ['./youtube-player.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubePlayerComponent implements OnInit {

	private readonly sanitizer = inject(DomSanitizer);

	/** Youtube video id. */
	@Input({ required: true })
	public videoId = '';

	/** Youtube video url. */
	protected videoUrl: string | SafeResourceUrl = '';

	/** @inheritdoc */
	public ngOnInit(): void {
		this.videoUrl = this.makeYoutubeVideoUrl(this.videoId);
	}

	private makeYoutubeVideoUrl(youtubeTrailerId: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(YoutubeUtils.makeEmbeddedUrl(youtubeTrailerId));
	}
}
