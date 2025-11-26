"use client";

import { useEffect, useRef, useState } from "react";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import { siteConfig } from "@/config/site.config";

export const Logo = () => (
	<Image
		src="/mic.svg"
		alt={siteConfig.title}
		width={26}
		height={26}
		priority
	/>
);

export default function Menu() {
	const pathname = usePathname();
	const { isAuth } = useAuthStore();

	// Ссылка на контейнер навигации и индикатор underline
	const navRef = useRef<HTMLDivElement>(null);
	const underlineRef = useRef<HTMLDivElement>(null);

	// Состояние позиционирования underline
	const [underlineStyle, setUnderlineStyle] = useState<{
		left: number;
		width: number;
	}>({
		left: 0,
		width: 0,
	});

	// Функция для нахождения активного элемента и установки позиции underline
	const updateUnderline = () => {
		if (!navRef.current) return;
		const navItems = navRef.current.querySelectorAll("a[data-nav]");
		const activeItem = Array.from(navItems).find(
			(item) => item.getAttribute("href") === pathname
		);
		if (activeItem && underlineRef.current) {
			const rect = activeItem.getBoundingClientRect();
			const navRect = navRef.current.getBoundingClientRect();

			setUnderlineStyle({
				left: rect.left - navRect.left,
				width: rect.width,
			});
		} else {
			setUnderlineStyle({ left: 0, width: 0 });
		}
	};

	// Обновляем underline при монтировании компонента и смене пути
	useEffect(() => {
		updateUnderline();
		window.addEventListener("resize", updateUnderline);
		return () => window.removeEventListener("resize", updateUnderline);
	}, [pathname]);

	const getNavItems = () =>
		siteConfig.navItems
			.filter((item) => (item.href === "/list" ? isAuth : true))
			.map((item) => {
				const isActive = pathname === item.href;
				return (
					<NavbarItem key={item.href} className="">
						<Link
							href={item.href}
							data-nav
							className={`px-3 py-1 transition-colors duration-300 ${
								isActive
									? "text-[#6f8d8f]"
									: "text-foreground hover:text-blue-300"
							}`}
						>
							{item.icon && <item.icon />}
						</Link>
					</NavbarItem>
				);
			});

	return (
		<>
			{isAuth && (
				<Navbar className=" w-fit">
					<div ref={navRef} className=" flex gap-4 relative">
						<NavbarContent justify="center">{getNavItems()}</NavbarContent>
						{/* индикатор подчеркивания */}
						<div
							ref={underlineRef}
							style={{
								position: "absolute",
								bottom: 0,
								left: underlineStyle.left,
								width: underlineStyle.width,
								height: 2,
								backgroundColor: "#6f8d8f",
								transition: "left 0.3s ease, width 0.3s ease",
								borderRadius: 1,
							}}
						/>
					</div>
				</Navbar>
			)}
		</>
	);
}
