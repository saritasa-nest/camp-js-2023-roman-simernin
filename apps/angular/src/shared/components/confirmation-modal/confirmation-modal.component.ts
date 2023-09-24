import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/** Confirmation modal parameters. */
export interface ConfirmationModalParameters {

	/** Confirmation text. */
	readonly confirmationText: string;
}

/** Confirmation modal coomponent. */
@Component({
	selector: 'camp-confirmation-modal',
	templateUrl: './confirmation-modal.component.html',
	styleUrls: ['./confirmation-modal.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent {

	private readonly dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);

	/** Modal data. */
	protected readonly modalParameters = inject<ConfirmationModalParameters>(MAT_DIALOG_DATA);

	/** Close dialog. */
	protected closeDialog(): void {
		this.dialogRef.close();
	}
}
