export namespace EnumUtils {

	/**
	 * Convert enum to string array.
	 * @param enumeration - Enumeration.
	 */
	export function toArray<T extends Record<string, unknown>>(enumeration: T): readonly T[keyof T] [] {
		return Object.keys(enumeration)
			.filter(key => isNaN(Number(key)))
			.map(key => enumeration[key])
			.filter(
				(val): val is T[keyof T] =>
					typeof val === 'number' || typeof val === 'string',
			);
	}

	/**
	 * Convert enum to string array.
	 * @param enumValueAsString - Enum value as string.
	 * @param enumeration - Enumeration.
	 */
	export function fromString<TKey extends string, TValue extends string>(
		enumValueAsString: string,
		enumeration: { [key in TKey]: TValue },
	): TValue | null {
		if (enumValueAsString === '') {
			return null;
		}

		const enumValue = Object.values(enumeration).find((value): value is TValue => value === enumValueAsString);

		if (enumValue === undefined) {
			console.warn(`There is no this enum value ${enumValueAsString}`);

			return null;
		}

		return enumValue;
	}
}
