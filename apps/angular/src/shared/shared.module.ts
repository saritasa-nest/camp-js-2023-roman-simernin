import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { EmptyPipe } from './pipes/empty.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

/** Shared module. */
@NgModule({
	declarations: [EmptyPipe, JoinPipe, YoutubePlayerComponent, ConfirmationModalComponent],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
	],
	exports: [EmptyPipe, JoinPipe, YoutubePlayerComponent, ConfirmationModalComponent],
})
export class SharedModule {}
