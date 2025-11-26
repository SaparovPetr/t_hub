///63///
"use client";

import { useAuthStore } from "@/store/auth.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePostStore } from "@/store/post.store";
import { useCurrentUserStore } from "@/store/current-user.store";

interface IProps {
	children: React.ReactNode;
}

// Компонент-обертка для загрузки данных приложения
const AppLoader = ({ children }: IProps) => {
	// получаем сессию и статус аутентификации из next-auth
	const { data: session, status } = useSession();
	// получаем состояние аутентификации из zustand
	const { isAuth, setAuthState } = useAuthStore();

	const { currentUserEmail } = useCurrentUserStore();

	const { loadPosts } = usePostStore();
	const { setCurrentUserState } = useCurrentUserStore();

	// при изменении статуса аутентификации или сессии ее обновляем в zustand
	useEffect(() => {
		setAuthState(status, session);
	}, [status, session, setAuthState]);

	useEffect(() => {
		if (isAuth) {
			loadPosts();
		}
	}, [currentUserEmail, isAuth, loadPosts]);

	useEffect(() => {
		if (isAuth && session?.user?.email) {
			setCurrentUserState(session?.user?.email);
		}
	}, [currentUserEmail, isAuth, session?.user?.email, setCurrentUserState]);

	return <>{children}</>;
};

export default AppLoader;
