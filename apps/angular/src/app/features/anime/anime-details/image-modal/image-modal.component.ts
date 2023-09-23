import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Image modal data. */
export interface ImageModalParameters {

	/** Image url. */
	readonly imageUrl: string;
}

/** Image modal component. */
@Component({
	selector: 'camp-image-modal',
	templateUrl: './image-modal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageModalComponent {

	/** Modal data. */
	protected readonly imageModelData = inject<ImageModalParameters>(MAT_DIALOG_DATA);
}
