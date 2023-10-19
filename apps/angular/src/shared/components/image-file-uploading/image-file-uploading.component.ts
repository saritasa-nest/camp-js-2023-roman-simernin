import { Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ImageFile } from '@js-camp/core/models/image-file';
import { BehaviorSubject, Observable, filter, from, switchMap} from 'rxjs';

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
})
export class ImageFileUploadingComponent implements ControlValueAccessor, Validator {

	private imageFile$ = new BehaviorSubject<ImageFile>({
		source: null,
	});

	/** Provide control is disabled.  */
	protected isDisabled = false;

	/** Image file url stream. */
	protected imageFileUrl$: Observable<string>;

	public constructor() {
		this.imageFileUrl$ = this.imageFile$.pipe(
			filter(imageFile => imageFile.source !== null),
			switchMap(imageFile => from(this.mapImageFileUrl(imageFile))),
		);
	}

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

		const imageFile: ImageFile = {
			source: files[0],
		};

		this.imageFile$.next(imageFile);

		this.onImageFileChanged?.(imageFile);
	}

	private mapImageFileUrl(imageFile: ImageFile): Promise<string> {
		if (imageFile.source instanceof File) {
			const fileReader = new FileReader();

			fileReader.readAsDataURL(imageFile.source);

			return new Promise<string>(resolve => {
				fileReader.onloadend = function () {
					if (typeof (fileReader.result) === 'string') {
						resolve(fileReader.result);
					}
				}
			})
		}

		return Promise.resolve(imageFile.source as string);
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

		if (imageFile.source === null) {
			return {
				required: true,
			};
		}

		return null;
	}
}
