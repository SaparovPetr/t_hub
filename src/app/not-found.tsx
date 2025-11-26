///14///

"use client";

import { getRandomInt } from "@/utils/getRandomInt";
import { Button } from "@heroui/react";
import Link from "next/link";

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center ">
			<div className="text-8xl font-bold text-gray-300">404</div>

			<h1 className="text-3xl font-bold tracking-tight">Страница не найдена</h1>

			<div className="pt-6">
				<Button
					as={Link}
					style={{
						backgroundColor: `var(--card-background_${getRandomInt()})`,
					}}
					className=" w-full bordered border-1 text-xl"
					variant="shadow"
					href="/"
				>
					Вернуться на главную
				</Button>
			</div>
		</div>
	);
};

export default NotFoundPage;
