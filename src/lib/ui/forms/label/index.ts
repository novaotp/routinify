import Control from './Control.svelte';
import Root from './Root.svelte';

/**
 * @example
 * import { Input, Label } from '$lib/ui/forms';
 *
 * <Label.Root>
 *      <Label.Control for="email">Email</Label.Control>
 *      <Input name="email" placeholder="Enter your email..." />
 * </Label.Root>
 */
export const Label = {
	Root,
	Control
} as const;
