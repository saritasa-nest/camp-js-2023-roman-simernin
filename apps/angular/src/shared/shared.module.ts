import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { EmptyPipe } from './pipes/empty.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ImageFileUploadingComponent } from './components/image-file-uploading/image-file-uploading.component';
import { MultipleAutocompleteComponent } from './components/multiple-autocomplete/multiple-autocomplete.component';

/** Shared module. */
@NgModule({
	declarations: [
		EmptyPipe,
		JoinPipe,
		YoutubePlayerComponent,
		ConfirmationModalComponent,
		ImageFileUploadingComponent,
		MultipleAutocompleteComponent,
	],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatAutocompleteModule,
		MatChipsModule,
		ReactiveFormsModule,
		MatInputModule,
		InfiniteScrollModule,
	],
	exports: [
		EmptyPipe,
		JoinPipe,
		YoutubePlayerComponent,
		ConfirmationModalComponent,
		ImageFileUploadingComponent,
		MultipleAutocompleteComponent,
	],
})
export class SharedModule {}
