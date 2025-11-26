///39///
import bcryptjs from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "../utils/user";
import prisma from "../utils/prisma";
import { signInSchema } from "../schema/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
	///43///
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: "Account",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			// функция авторизации пользователя и возврата объекта пользователя
			authorize: async (credentials) => {
				try {
					// Проверяем наличие email и пароля
					if (!credentials?.email || !credentials?.password) {
						throw new Error("Email и пароль обязательны");
					}

					// Валидируем входные данные с помощью схемы Zod
					const { email, password } = await signInSchema.parseAsync(
						credentials
					);

					// Получаем пользователя из базы данных по email
					const user = await getUserFromDb(email);

					// Если пользователь не найден или пароль отсутствует, выбрасываем ошибку
					if (!user || !user.password) {
						throw new Error("Неверный ввод данных");
					}

					// Сравниваем введенный пароль с хешированным паролем из базы данных
					const isPasswordValid = await bcryptjs.compare(
						password,
						user.password
					);

					// если пароль неверен, выбрасываем ошибку
					if (!isPasswordValid) {
						throw new Error("Неверный ввод данных");
					}

					// Возвращаем объект пользователя с необходимыми полями
					return { id: user.id, email: user.email };
				} catch (error) {
					if (error instanceof ZodError) {
						// Return `null` to indicate that the credentials are invalid
						return null;
					}
					return null;
				}
			},
		}),
	],
	///56///
	session: {
		strategy: "jwt",
		maxAge: 3600, //продолжительность сессии в секундах (1 час)
	},
	// добавляем секретный ключ для подписи JWT токенов
	secret: process.env.AUTH_SECRET,
	// добавляем коллбеки для NextAuth - они позволяют настраивать поведение аутентификации
	callbacks: {
		// добавляем коллбек для JWT токена, он создается каждый раз при создании сессии (при входе пользователя)
		// чтобы сохранять в токене id пользователя
		// это позволит нам идентифицировать пользователя в сессии
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
});
