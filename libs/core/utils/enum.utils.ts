export namespace EnumUtils {

	/**
		* Convert enum to string array.
  * @param enumeration - Enumeration.
  */
	export function toArray<TKey extends string, TValue extends string>(enumeration: { [key in TKey]: TValue }): readonly string[] {
		return Object.values(enumeration);
	}

	/**
		* Convert enum to string array.
		* @param enumValueAsString - Enum value as string.
  * @param enumeration - Enumeration.
  */
	export function fromString<TKey extends string, TValue extends string>(
		enumValueAsString: string,
		enumeration: { [key in TKey]: TValue },
	): TValue {
		const enumValue = enumeration[enumValueAsString as keyof typeof enumeration];

		if (enumValue === undefined) {
			throw new Error(`There is no this enum value ${enumValueAsString}`);
		}

		return enumValue;
	}
}
