import { Pipe, PipeTransform } from '@angular/core';

/** Transform empty value.*/
@Pipe({
	name: 'empty',
})
export class EmptyPipe implements PipeTransform {

	private readonly defaultEmptyReplacement = '-';

	/** @inheritdoc */
	public transform(value: unknown, emptyReplacement: string = ''): string {
		if (value === null || value === undefined || value === '') {
			return emptyReplacement !== '' ?
				emptyReplacement :
				this.defaultEmptyReplacement;
		}

		return value.toString();
	}
}
