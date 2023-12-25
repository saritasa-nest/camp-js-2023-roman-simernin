import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
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
export class ImageFileUploadingComponent implements OnDestroy, ControlValueAccessor, Validator {

	private imageFileUrl: string | null = null;

	/** Image file subject. */
	protected readonly imageFile$ = new BehaviorSubject<ImageFile>('');

	/** Provide control is disabled.  */
	protected isDisabled = false;

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.destroyImageUrl();
	}

	/**
	 * Upload image file.
	 * @param event - Event.
	 */
	protected uploadImageFile(event: Event): void {
		this.onImageFileTouched();

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

		this.onImageFileChanged(imageFile);

		this.destroyImageUrl();
	}

	/**
	 * Get image location.
	 * @param imageFile Image file.
	 */
	protected getImageName(imageFile: ImageFile | null): string {
		if (imageFile === null) {
			return '';
		}

		return typeof (imageFile) === 'string' ?

			// Get last section in image url in file storage.
			imageFile.split('/').at(-1) ?? '' :
			imageFile.name;
	}

	/**
	 * Get image source.
	 * @param imageFile - Image file.
	 */
	protected getImageSource(imageFile: ImageFile): string {
		return typeof (imageFile) === 'string' ?
			imageFile :
			this.createImageUrl(imageFile);
	}

	private createImageUrl(file: File): string {
		this.imageFileUrl = URL.createObjectURL(file);
		return this.imageFileUrl;
	}

	private destroyImageUrl(): void {
		if (this.imageFileUrl === null) {
			return;
		}

		URL.revokeObjectURL(this.imageFileUrl);
		this.imageFileUrl = null;
	}

	private onImageFileChanged: ImageFileChangedFunction = () => undefined;

	private onImageFileTouched: ImageFileTouchedFunction = () => undefined;

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
	public setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	/** @inheritdoc */
	public validate(control: AbstractControl<ImageFile, ImageFile>): ValidationErrors | null {
		const imageFile = control.value;

		if (typeof (imageFile) === 'string' && control.hasValidator(Validators.required)) {
			return Validators.required(control);
		}

		return null;
	}
}
