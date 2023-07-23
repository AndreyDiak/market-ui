export const classNames = (...classes: (string | undefined | null | boolean)[]): string => classes.filter(Boolean).join(" ");
