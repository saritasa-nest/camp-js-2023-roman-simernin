import { Pipe, PipeTransform } from '@angular/core';

/** Pipe for join array to string by separator. */
@Pipe({
	name: 'join',
})
export class JoinPipe implements PipeTransform {
	/** @inheritdoc */
	public transform<T>(value?: readonly T[], separator = ', '): string {
		if (value) {
			return value.join(separator);
		}
		return '';
	}
}
