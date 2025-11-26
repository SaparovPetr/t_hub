import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site.config";
import Menu from "./menu";

export default function Header() {
	return (
		<header className="flex justify-between ">
			<Link
				href="/list"
				className="flex gap-1 justify-center items-center font-bold text-xl p-8"
			>
				<Image
					src="/mic.svg"
					alt={siteConfig.title}
					width={26}
					height={26}
					priority
				/>
				<p className="text-2xl">THub</p>
			</Link>
			<Menu />
		</header>
	);
}
