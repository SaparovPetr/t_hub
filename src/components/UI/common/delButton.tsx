///23///

"use client";

import { Button, Link } from "@heroui/react";
import { useState } from "react";
import DeleteModal from "../modals/delete.modal";
import { useAuthStore } from "@/store/auth.store";

const DelButton = () => {
	const [isDelOpen, setIsDelOpen] = useState(false);
	const { isAuth } = useAuthStore();

	return (
		<>
			{isAuth && (
				<>
					<Button
						className=" w-full bordered border-1 text-xl"
						as={Link}
						href="#"
						onPress={() => setIsDelOpen(true)}
					>
						Delete
					</Button>

					<DeleteModal isOpen={isDelOpen} onClose={() => setIsDelOpen(false)} />
				</>
			)}

			{!isAuth && (
				<Button as={Link} href="/">
					Go to profile{" "}
				</Button>
			)}
		</>
	);
};

export default DelButton;
