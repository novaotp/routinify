/**
 * Modifies an event listener to only trigger if the event target is the same element that the event listener was added to.
 * @param fn The function to modify.
 * @example
 * const handleClick = (event) => { ... };
 * const handleClickSelf = self(handleClick);
 * element.addEventListener('click', handleClickSelf);
 */
export const self = <T extends Event | undefined>(fn: (event?: T) => unknown) => {
	return (event: T) => {
		if (event?.target === event?.currentTarget) {
			return fn(event);
		}
	};
};
