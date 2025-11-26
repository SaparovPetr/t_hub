"use client";

import CustomModal from "../common/modal";
import { Button, Link } from "@heroui/react";
import { useAuthStore } from "@/store/auth.store";
import { signOutFunc } from "@/actions/sign-out";
import { getRandomInt } from "@/utils/getRandomInt";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: IProps) => {
	const { setAuthState } = useAuthStore();

	///52///
	const handleSignOut = async () => {
		try {
			await signOutFunc();
		} catch (error) {
			console.error("error", error);
		}
		///62///
		setAuthState("unauthenticated", null);
		onClose();
	};

	return (
		<CustomModal isOpen={isOpen} onClose={onClose} title="Confirm exit">
			<Button
				style={{
					backgroundColor: `var(--card-background_${getRandomInt()})`,
				}}
				as={Link}
				href="#"
				onPress={() => handleSignOut()}
			>
				Exit
			</Button>
		</CustomModal>
	);
};

export default LogoutModal;
