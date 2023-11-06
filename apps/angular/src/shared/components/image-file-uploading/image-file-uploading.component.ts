import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ImageFile } from '@js-camp/core/models/image-file';
import { BehaviorSubject } from 'rxjs';

type ImageFileChangedFunction = (imageFile: ImageFile) => void;
type ImageFileTouchedFunction = () => void;

/** Image file uploading component. */
@Component({
	selector: 'camp-image-file-uploading',
	templateUrl: './image-file-uploading.component.html',
	styleUrls: ['./image-file-uploading.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: ImageFileUploadingComponent,
		},
		{
			provide: NG_VALIDATORS,
			multi: true,
			useExisting: ImageFileUploadingComponent,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFileUploadingComponent implements ControlValueAccessor, Validator {

	/** Image file subject. */
	protected imageFile$ = new BehaviorSubject<ImageFile>('');

	/** Provide control is disabled.  */
	protected isDisabled = false;

	/**
	 * Upload image file.
	 * @param event - Event.
	 */
	protected uploadImageFile(event: Event): void {
		this.onImageFileTouched?.();

		const { target } = event;

		if (target === null) {
			return;
		}

		const { files } = target as HTMLInputElement;

		if (files === null) {
			return;
		}

		const imageFile: ImageFile = files[0];

		this.imageFile$.next(imageFile);

		this.onImageFileChanged?.(imageFile);
	}

	/**
	 * Get image location.
	 * @param imageFile Image file.
	 */
	protected getImageName(imageFile: string | File | null): string {
		if (imageFile === null) {
			return '';
		}

		return typeof (imageFile) === 'string' ?

			// Get last section in image url in file storage.
			imageFile.split('/').pop() ?? '' :
			imageFile.name;
	}

	/**
	 * Get image source.
	 * @param imageFile - Image file.
	 */
	protected getImageSource(imageFile: string | File): string {
		return typeof (imageFile) === 'string' ?
			imageFile :
			URL.createObjectURL(imageFile);
	}

	private onImageFileChanged: ImageFileChangedFunction | null = null;

	private onImageFileTouched: ImageFileTouchedFunction | null = null;

	/** @inheritdoc */
	public writeValue(imageFile: ImageFile): void {
		this.imageFile$.next(imageFile);
	}

	/** @inheritdoc */
	public registerOnChange(onImageFileChanged: ImageFileChangedFunction): void {
		this.onImageFileChanged = onImageFileChanged;
	}

	/** @inheritdoc */
	public registerOnTouched(onImageFileTouched: ImageFileTouchedFunction): void {
		this.onImageFileTouched = onImageFileTouched;
	}

	/** @inheritdoc */
	public setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	/** @inheritdoc */
	public validate(control: AbstractControl<ImageFile, ImageFile>): ValidationErrors | null {
		const imageFile = control.value;

		if (imageFile === '') {
			return {
				required: true,
			};
		}

		return null;
	}
}
