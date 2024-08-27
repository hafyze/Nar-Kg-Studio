export interface User {
	id: string;
	username: string;
	email: string;
	passwordHash: string;
	firstName: string;
	lastName: string;
	createdDt: string;
	updatedDt: string;
}

export interface UserLogin {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}