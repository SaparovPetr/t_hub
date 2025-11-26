///7///
"use client";

///8///
import {
	Button,
	Card,
	CardHeader,
	Divider,
	CardBody,
	CardFooter,
	Image as HeroImage,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";

import RegistrationModal from "@/components/UI/modals/registration.modal";
import LoginModal from "@/components/UI/modals/login.modal";
import LogoutModal from "@/components/UI/modals/logout.modal";
import { useCurrentUserStore } from "@/store/current-user.store";

export default function Home() {
	///61///
	const { isAuth } = useAuthStore();

	///26///
	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isLogoutOpen, setIsLogoutnOpen] = useState(false);
	const { currentUserEmail } = useCurrentUserStore();

	return (
		<div className="flex flex-col items-center gap-7 pt-15">
			{!isAuth && (
				<Card
					className="max-w-[400px] text-#e6c2a2 bg-[#856950] border-1 p-2 text-cyan-950"
					isBlurred
				>
					<CardHeader className="flex gap-3">
						<HeroImage
							alt="heroui logo"
							height={40}
							radius="sm"
							src="/mic.svg"
							width={40}
						/>
						<div className="flex flex-col">
							<p className="text-2xl">TranscriptoHub</p>
							<p className="  text-#F5F1E8 text-xl">
								transcripto-hub.vercel.app
							</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody className="space-y-2 text-xl">
						<p>
							This service is a personal space for storing podcast transcripts.
						</p>
						<p>
							Save, listen, read, and improve your English comprehension — all
							in one place, without ads or unnecessary distractions.
						</p>
					</CardBody>
					<Divider />

					<CardFooter className="flex justify-between">
						<Button
							className="text-xl text-cyan-950 bg-[#a3a9a3]"
							as={Link}
							href="#"
							onPress={() => setIsLoginOpen(true)}
						>
							Log in
						</Button>

						<Button
							className="text-xl text-cyan-950 bg-[#90b396]"
							as={Link}
							href="#"
							onPress={() => setIsRegistrationOpen(true)}
						>
							Sign in
						</Button>
					</CardFooter>
				</Card>
			)}

			{/* ///57/// */}
			{isAuth && (
				<>
					<h1>Hello {currentUserEmail}!</h1>
					<Button
						className=" w-full bordered border-1 text-xl"
						as={Link}
						href="#"
						onPress={() => setIsLogoutnOpen(true)}
					>
						Sign out
					</Button>
				</>
			)}

			{/* ///25/// */}
			<RegistrationModal
				isOpen={isRegistrationOpen}
				onClose={() => setIsRegistrationOpen(false)}
			/>
			<LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
			<LogoutModal
				isOpen={isLogoutOpen}
				onClose={() => setIsLogoutnOpen(false)}
			/>
		</div>
	);
}
