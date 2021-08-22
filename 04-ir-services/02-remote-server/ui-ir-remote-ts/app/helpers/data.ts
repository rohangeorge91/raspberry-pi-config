/**
 * Return value if not null else return default value.
 * @param value the value if present
 * @param defaultValue the default value if value is null
 * @returns the value or default value
 */
export const getValue = <Type>(value: Type, defaultValue: Type) => value ? value : defaultValue;