import { createPost, deletePost, getOnePost, getPosts } from "@/actions/post";
import { IPostData } from "@/types/form-data";
import { create } from "zustand";

interface PostState {
	posts: IPostData[];
	currentPost: IPostData | null;
	isLoading: boolean;
	error: string | null;
	loadPosts: () => Promise<void>;
	loadOnePost: (id: string) => Promise<void>;
	addPost: (formData: FormData) => Promise<void>;
	removePost: (id: string) => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
	posts: [],
	isLoading: false,
	error: null,
	currentPost: null,
	loadPosts: async () => {
		set({ isLoading: true, error: null });

		try {
			const result = await getPosts();

			if (!("error" in result)) {
				set({ posts: result.posts, isLoading: false });
			} else {
				set({ error: result.error, isLoading: false });
			}
		} catch (error) {
			console.error("error", error);
			set({ error: "Error loading posts", isLoading: false });
		}
	},

	loadOnePost: async (id: string) => {
		set({ isLoading: true, error: null });

		try {
			const result = await getOnePost(id);

			if (!("error" in result)) {
				set({ currentPost: result.post, isLoading: false });
			} else {
				set({ error: result.error, isLoading: false, currentPost: null });
			}
		} catch (error) {
			console.error("error", error);
			set({
				error: "Error loading post",
				isLoading: false,
				currentPost: null,
			});
		}
	},

	addPost: async (formData: FormData) => {
		set({ error: null });

		try {
			const postData: IPostData = {
				title: formData.get("title") as string,
				content: formData.get("content") as string,
				userEmail: formData.get("userEmail") as string,
				author: formData.get("author") as string,
				description: formData.get("description") as string,
			};
			const result = await createPost(postData);

			if (!("error" in result)) {
				set((state) => ({
					posts: [...state.posts, result],
					isLoading: false,
				}));
			} else {
				set({ error: result.error, isLoading: false });
			}
		} catch (error) {
			console.error("error", error);
			set({ error: "Error adding post", isLoading: false });
		}
	},

	removePost: async (id: string) => {
		set({ error: null });

		try {
			const result = await deletePost(id);

			if (result.success) {
				set((state) => ({
					posts: state.posts.filter((post) => post.id !== id),
					isLoading: false,
				}));
			} else {
				set({ error: result.error, isLoading: false });
			}
		} catch (error) {
			console.error("error", error);
			set({ error: "Error deleting post", isLoading: false });
		}
	},
}));
