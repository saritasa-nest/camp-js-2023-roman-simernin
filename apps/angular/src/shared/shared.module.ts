import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyPipe } from './pipes/empty.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';

/** Shared module. */
@NgModule({
	declarations: [EmptyPipe, JoinPipe, YoutubePlayerComponent],
	imports: [CommonModule],
	exports: [EmptyPipe, JoinPipe, YoutubePlayerComponent],
})
export class SharedModule {}
