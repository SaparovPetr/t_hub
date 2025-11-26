import { create } from "zustand";

// интерфейс состояния аутентификации
interface CurrentUserState {
	currentUserEmail: string;
	currentUserId: string | null;
	setCurrentUserState: (currentUserId: string) => void;
}

export const useCurrentUserStore = create<CurrentUserState>((set) => ({
	// начальное состояние
	currentUserEmail: "",
	currentUserId: null,
	setCurrentUserState: (currentUserEmail: string) =>
		set({
			currentUserEmail,
		}),
}));
