///60///
import { Session } from "next-auth";
import { create } from "zustand";

type SessionStatus = "authenticated" | "unauthenticated" | "loading";

// интерфейс состояния аутентификации
interface AuthState {
	isAuth: boolean;
	status: SessionStatus;
	session: Session | null;
	setAuthState: (status: SessionStatus, session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	// начальное состояние
	isAuth: false,
	status: "loading",
	session: null,
	setAuthState: (status: SessionStatus, session: Session | null) =>
		// метод для обновления стора
		set({
			// если статус аутентификации "authenticated", значит true
			isAuth: status === "authenticated",
			status,
			session,
		}),
}));
