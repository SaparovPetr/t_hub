export interface IFormData {
	email: string;
	password: string;
	confirmPassword: string;
}

export interface IPostData {
	id?: string;
	title: string;
	content: string;
	userEmail: string;
	description: string | null;
	author: string | null;
}
