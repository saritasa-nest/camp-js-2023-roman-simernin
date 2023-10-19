import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { EmptyPipe } from './pipes/empty.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ImageFileUploadingComponent } from './components/image-file-uploading/image-file-uploading.component';

/** Shared module. */
@NgModule({
	declarations: [EmptyPipe, JoinPipe, YoutubePlayerComponent, ConfirmationModalComponent, ImageFileUploadingComponent],
	imports: [
		CommonModule, 
		MatDialogModule, 
		MatButtonModule,
		MatIconModule,
	],
	exports: [EmptyPipe, JoinPipe, YoutubePlayerComponent, ConfirmationModalComponent, ImageFileUploadingComponent],
})
export class SharedModule {}
