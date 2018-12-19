import InvalidValueException from "../exceptions/InvalidValueException";

export function Check<T>(argument: string, value: T, checker: (value: T) => string|null) {
  let err = checker(value);
  if (err !== null)
    throw new InvalidValueException(argument, value, err);
}