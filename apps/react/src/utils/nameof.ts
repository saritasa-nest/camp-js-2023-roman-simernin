/**
 * Return object key. If it does not exist, then a compilation error.
 * @param objectKey - Key.
 */
export function nameof<T>(): (objectKey: keyof T) => keyof T {
	return (objectKey: keyof T) => objectKey;
}
