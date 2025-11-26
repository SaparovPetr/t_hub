///36///
"use server";

import { IFormData } from "@/types/form-data";
import { saltAndHashPassword } from "@/utils/password";
import prisma from "@/utils/prisma";

export async function registerUser(formData: IFormData) {
	const { email, password, confirmPassword } = formData;

	// Валидация паролей
	if (password !== confirmPassword) {
		return { error: "Пароли не совпадают" };
	}

	// Валидация длины пароля
	if (password.length < 6) {
		return { error: "Пароль должен быть не менее 6 символов" };
	}

	try {
		// Проверка, существует ли пользователь с таким email
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		// Если пользователь существует, возвращаем ошибку
		if (existingUser) {
			return { error: "Пользователь с таким email уже существует" };
		}

		///54///
		const pwHash = await saltAndHashPassword(password);

		///35///
		const user = await prisma.user.create({
			data: {
				email: email,
				password: pwHash,
			},
		});

		return user;
	} catch (error) {
		console.error("Registration error:", error);
		return { error: "Registration error" };
	}
}
