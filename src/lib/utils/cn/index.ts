import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that merges one or more class names. *
 * @param classLists The class names to be merged.
 * @returns The merged class name.
 * @example
 * import { cn } from '$lib/utils/cn';
 *
 * const className = cn('text-red-500', 'hover:text-blue-500'); // "text-red-500 hover:text-blue-500"
 */
export const cn = (...classLists: ClassValue[]): string => {
	return twMerge(clsx(classLists));
};
