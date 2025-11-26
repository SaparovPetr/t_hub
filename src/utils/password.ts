///53///
import bcryptjs from "bcryptjs";

export async function saltAndHashPassword(password: string): Promise<string> {
	// количество раундов соли для bcrypt - чем больше, тем безопаснее, но медленнее
	// обычно используется значение от 10 до 12
	// соль это случайные данные, добавляемые к паролю перед хешированием для повышения безопасности
	// то есть не только хешируем пароль, но и добавляем к нему соль, чтобы усложнить взлом
	const saltRounds = 10;

	// генерируем соль и хешируем пароль
	// хешиование производится асинхронно, поэтому используем await
	return await bcryptjs.hash(password, saltRounds);
}
