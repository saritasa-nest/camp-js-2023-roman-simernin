import { Component, inject } from '@angular/core';
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
})
export class ConfirmationModalComponent {

	private readonly dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);

	/** Modal data. */
	protected readonly confirmationModalParameters = inject<ConfirmationModalParameters>(MAT_DIALOG_DATA);

	/** Close dialog. */
	protected closeDialog(): void {
		this.dialogRef.close();
	}
}
