///21///

"use client";

import { createPost } from "@/actions/post";
import { useCurrentUserStore } from "@/store/current-user.store";
import { usePostStore } from "@/store/post.store";
import { Button, Form, Input, Textarea } from "@heroui/react";
import { useState } from "react";

interface IProps {
	onClose: () => void;
}

const CreateForm = ({ onClose }: IProps) => {
	const { currentUserEmail } = useCurrentUserStore();

	const [formData, setFormData] = useState({
		title: "",
		content: "",
		author: "",
		description: "",
		userEmail: currentUserEmail,
	});
	const { loadPosts } = usePostStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		///55///
		await createPost(formData);
		loadPosts();

		onClose();
	};

	return (
		<Form className="w-full" onSubmit={handleSubmit}>
			<Input
				aria-label="Title"
				isRequired
				name="title"
				placeholder="Enter the title"
				value={formData.title}
				classNames={{
					inputWrapper: "bg-default-100",
					input:
						"caret-black text-sm focus:outline-2 focus:outline-blue-600 focus:outline-offset-8 rounded-sm",
				}}
				onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				validate={(value) => {
					if (!value) return "Title is required";
					return null;
				}}
			/>
			<Input
				aria-label="Author"
				isRequired
				name="author"
				placeholder="Author"
				value={formData.author}
				classNames={{
					inputWrapper: "bg-default-100",
					input:
						"caret-black text-sm focus:outline-2 focus:outline-blue-600 focus:outline-offset-8 rounded-sm",
				}}
				onChange={(e) => setFormData({ ...formData, author: e.target.value })}
				validate={(value) => {
					if (!value) return "This field is required";
					return null;
				}}
			/>
			<Input
				aria-label="Description"
				isRequired
				name="description"
				placeholder="Enter the description"
				value={formData.description}
				classNames={{
					inputWrapper: "bg-default-100",
					input:
						"caret-black text-sm focus:outline-2 focus:outline-blue-600 focus:outline-offset-8 rounded-sm",
				}}
				onChange={(e) =>
					setFormData({ ...formData, description: e.target.value })
				}
				validate={(value) => {
					if (!value) return "Поле обязательно";
					return null;
				}}
			/>
			<Textarea
				aria-label="Content"
				isRequired
				name="content"
				placeholder="Enter content"
				value={formData.content}
				classNames={{
					inputWrapper: "bg-default-100",
					input:
						"caret-black text-sm focus:outline-2 focus:outline-blue-600 focus:outline-offset-8 rounded-sm",
				}}
				onChange={(e) => setFormData({ ...formData, content: e.target.value })}
				validate={(value) => {
					if (!value) return "Content is required";
					return null;
				}}
			/>

			<div className="flex w-full  gap-4 items-center pt-8 justify-end">
				<Button variant="light" onPress={onClose}>
					Cancel
				</Button>
				<Button type="submit">Create</Button>
			</div>
		</Form>
	);
};

export default CreateForm;
