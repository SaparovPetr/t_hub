"use client";

import CustomModal from "../common/modal";
import { Button, Link } from "@heroui/react";
import { usePostStore } from "@/store/post.store";
import { redirect, useParams } from "next/navigation";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

const DeleteModal = ({ isOpen, onClose }: IProps) => {
	const { removePost } = usePostStore();
	const { id } = useParams();

	const handleRemovePost = (id: string) => {
		removePost(id);
		redirect(`/list`);
	};

	return (
		<CustomModal isOpen={isOpen} onClose={onClose} title="Confirm deletion">
			<Button
				className=" w-full bordered border-1 text-xl"
				as={Link}
				href="#"
				onPress={() => handleRemovePost(id as string)}
			>
				Delete
			</Button>
		</CustomModal>
	);
};

export default DeleteModal;
