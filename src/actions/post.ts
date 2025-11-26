"use server";

import { auth } from "@/auth/auth";
import { IPostData } from "@/types/form-data";
import prisma from "@/utils/prisma";

export async function createPost(formData: IPostData) {
	const { title, content, userEmail, author, description } = formData;

	try {
		const post = await prisma.post.create({
			data: {
				title,
				content,
				userEmail,
				author,
				description,
			},
		});

		return post;
	} catch (error) {
		console.error("Error creating post", error);
		return { error: "Error creating post" };
	}
}

export async function getPosts() {
	const session = await auth();
	try {
		const userEmail = session?.user?.email ?? null;
		const whereClause = userEmail ? { userEmail } : {};
		const posts = await prisma.post.findMany({
			where: whereClause,
		});

		return { success: true, posts };
	} catch (error) {
		console.error("Error retrieving posts:", error);
		return { error: "Error retrieving posts" };
	}
}

export async function deletePost(id: string) {
	try {
		const post = await prisma.post.delete({
			where: { id },
		});

		return { success: true, post };
	} catch (error) {
		console.error("Error deleting post:", error);
		return { error: "Error deleting post" };
	}
}

export async function getOnePost(id: string) {
	try {
		const post = await prisma.post.findUnique({
			where: { id },
		});

		if (!post) {
			return { error: "Post not found" };
		}

		return { success: true, post };
	} catch (error) {
		console.error("Error receiving post:", error);
		return { error: "Error receiving post_" };
	}
}
