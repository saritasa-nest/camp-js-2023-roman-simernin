import { Pipe, PipeTransform } from '@angular/core';

/** Transform empty value.*/
@Pipe({
	name: 'commaJoin',
})
export class CommaJoinPipe implements PipeTransform {

	/** @inheritdoc */
	public transform(value: unknown): string | unknown {
		if (value instanceof Array) {
			return value.join(', ');
		}

		return value;
	}
}
