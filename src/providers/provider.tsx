"use client";

import { HeroUIProvider } from "@heroui/react";

///2/// добавление провайдера HeroIU в лейаут
export function Providers({ children }: { children: React.ReactNode }) {
	return <HeroUIProvider>{children}</HeroUIProvider>;
}
