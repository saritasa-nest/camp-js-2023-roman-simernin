import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Anime cover modal parameters. */
export interface AnimeCoverModalParameters {

	/** Image url. */
	readonly imageUrl: string;
}

/** Anime cover modal component. */
@Component({
	selector: 'camp-anime-cover-modal',
	templateUrl: './anime-cover-modal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCoverModalComponent {

	/** Modal data. */
	protected readonly animeCoverModalParameters = inject<AnimeCoverModalParameters>(MAT_DIALOG_DATA);
}
