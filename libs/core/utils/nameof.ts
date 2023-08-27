/**
 * Get function for type that return its passed field name.
 * Has compilation error if field doesn't exist.
 */
export const nameofFactory = <T extends object>() => (fieldName: keyof T) => fieldName;
