import { ListIcon } from "@/components/Icons/list-icon";
import { UserIcon } from "@/components/Icons/user-icon";

export const siteConfig = {
	title: "TranscriptoHub",
	description: "Транскрипции",
	navItems: [
		{ href: "/list", label: "Список", icon: ListIcon },
		{ href: "/", label: "Профиль", icon: UserIcon },
	],
};
