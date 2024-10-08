import { getContext, setContext } from 'svelte';

const USER_KEY = Symbol('User Key');

export const getUserContext = () => {
	return getContext<UserContext>(USER_KEY);
};

export const setUserContext = (user: App.Locals['user']) => {
	return setContext(USER_KEY, new UserContext(user));
};

class UserContext {
	private _user: App.Locals['user'] = $state({} as App.Locals['user']);

	constructor(user: App.Locals['user']) {
		this._user = user;
	}

	get user() {
		return this._user;
	}
}
