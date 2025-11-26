"use client";

import CustomModal from "../common/modal";
import CreateForm from "@/forms/create.form";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

const CreateModal = ({ isOpen, onClose }: IProps) => {
	return (
		<CustomModal isOpen={isOpen} onClose={onClose} title="Create">
			<CreateForm onClose={onClose} />
		</CustomModal>
	);
};

export default CreateModal;
