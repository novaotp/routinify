export type User = {
	id: string;
	authenticationId: string;
	avatarPath: string | null;
	nickname: string;
	email: string;
	createdAt: Date;
};
