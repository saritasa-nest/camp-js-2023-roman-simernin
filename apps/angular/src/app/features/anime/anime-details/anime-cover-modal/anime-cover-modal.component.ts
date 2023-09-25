import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Anime cover modal parameters. */
export interface AnimeCoverModalParameters {

	/** Image URL. */
	readonly imageUrl: string;
}

/** Anime cover modal component. */
@Component({
	selector: 'camp-anime-cover-modal',
	templateUrl: './anime-cover-modal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCoverModalComponent {

	/** Anime cover modal parameters. */
	protected readonly modalParameters = inject<AnimeCoverModalParameters>(MAT_DIALOG_DATA);
}
