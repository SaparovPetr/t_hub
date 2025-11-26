///20///
"use client";

import { registerUser } from "@/actions/register";
import { getRandomInt } from "@/utils/getRandomInt";
import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

interface IProps {
	onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await registerUser(formData);

		onClose();
	};

	return (
		<Form className="w-full" onSubmit={handleSubmit}>
			<Input
				aria-label="Email"
				isRequired
				name="email"
				placeholder="Enter your email"
				type="email"
				value={formData.email}
				classNames={{
					inputWrapper: "bg-default-100",
					input:
						"caret-black text-sm focus:outline-2 focus:outline-blue-600 focus:outline-offset-8 rounded-sm",
				}}
				onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				validate={(value) => {
					if (!value) return "Email is required";
					if (!validateEmail(value)) return "Incorrect email";
					return null;
				}}
			/>
			<Input
				isRequired
				name="password"
				placeholder="Enter passord"
				type="password"
				value={formData.password}
				classNames={{
					inputWrapper: "bg-default-100",
					input:
						"caret-black text-sm focus:outline-2 focus:outline-blue-600 focus:outline-offset-8 rounded-sm",
				}}
				onChange={(e) => setFormData({ ...formData, password: e.target.value })}
				validate={(value) => {
					if (!value) return "Password is required";
					if (value.length < 6)
						return "The password must be at least 6 characters long";
					return null;
				}}
			/>
			<Input
				isRequired
				name="confirmPassword"
				placeholder="Confirm passord"
				type="password"
				value={formData.confirmPassword}
				classNames={{
					inputWrapper: "bg-default-100",
					input:
						"caret-black text-sm focus:outline-2 focus:outline-blue-600 focus:outline-offset-8 rounded-sm",
				}}
				onChange={(e) =>
					setFormData({ ...formData, confirmPassword: e.target.value })
				}
				validate={(value) => {
					if (!value) return "Confirmation password is required";
					if (value !== formData.password) return "The passwords don't match";
					return null;
				}}
			/>

			<div className="flex w-full  gap-4 items-center pt-8 justify-end">
				<Button variant="light" onPress={onClose}>
					Cancel
				</Button>
				<Button
					style={{
						backgroundColor: `var(--card-background_${getRandomInt()})`,
					}}
					type="submit"
				>
					Register
				</Button>
			</div>
		</Form>
	);
};

export default RegistrationForm;
