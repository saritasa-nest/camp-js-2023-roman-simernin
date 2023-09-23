import { Pipe, PipeTransform } from '@angular/core';

/** Transform empty value.*/
@Pipe({
	name: 'empty',
	pure: false,
})
export class EmptyPipe implements PipeTransform {

	private readonly emptyReplacement: string = '-';

	/** @inheritdoc */
	public transform(value: unknown): string {
		if (value === null || value === undefined || value === '') {
			return this.emptyReplacement;
		}

		return value.toString();
	}
}
