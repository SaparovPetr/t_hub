///21///

"use client";

import { signInWithCredentials } from "@/actions/sign-in";
import { useAuthStore } from "@/store/auth.store";
import { useCurrentUserStore } from "@/store/current-user.store";
import { Button, Form, Input } from "@heroui/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

interface IProps {
	onClose: () => void;
}

const LoginForm = ({ onClose }: IProps) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { setAuthState } = useAuthStore();
	const { data: session } = useSession();
	const [errorState, setErrorState] = useState(false);
	const { setCurrentUserState } = useCurrentUserStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signInWithCredentials(formData.email, formData.password);
			setCurrentUserState(formData.email);
			setAuthState("authenticated", session);
		} catch {
			setErrorState(true);
		}
		if (errorState === false) {
			redirect(`/list`);
		}
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
						"caret-black  text-sm focus:outline-2 focus:outline-blue-600 focus:outline-offset-8 rounded-sm",
				}}
				onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				validate={(value) => {
					if (!value) return "Email is required";
					return null;
				}}
			/>
			<Input
				isRequired
				name="password"
				placeholder="Enter your password"
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
					return null;
				}}
			/>
			{errorState && <p className="text-red-300">Login error</p>}

			<div className="flex w-full  gap-4 items-center pt-8 justify-end">
				<Button variant="light" onPress={onClose}>
					Cancel
				</Button>
				<Button type="submit">Lon in</Button>
			</div>
		</Form>
	);
};

export default LoginForm;
