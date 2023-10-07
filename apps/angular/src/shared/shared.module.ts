import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyPipe } from './pipes/empty.pipe';
import { CommaJoinPipe } from './pipes/comma-join.pipe';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';

/** Shared module. */
@NgModule({
	declarations: [EmptyPipe, CommaJoinPipe, YoutubePlayerComponent],
	imports: [CommonModule],
	exports: [EmptyPipe, CommaJoinPipe, YoutubePlayerComponent],
})
export class SharedModule {}
