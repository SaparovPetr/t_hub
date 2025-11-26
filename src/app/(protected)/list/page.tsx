"use client";

import CreateModal from "@/components/UI/modals/create.modal";
import { useAuthStore } from "@/store/auth.store";
import { usePostStore } from "@/store/post.store";
import { getRandomInt } from "@/utils/getRandomInt";
import { Button, Card, CardBody, Divider, Spinner } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

const ListPage = () => {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const { posts, isLoading } = usePostStore();
	const { isAuth } = useAuthStore();

	const sortedPosts = posts.sort((a, b) => b.title.localeCompare(a.title));

	return (
		<>
			{isAuth && (
				<>
					<div className="flex w-full justify-end items-center mb-4">
						<Button
							className=" w-full bordered border-1 text-xl"
							as={Link}
							style={{
								backgroundColor: `var(--card-background_${getRandomInt()})`,
							}}
							href="#"
							onPress={() => setIsLoginOpen(true)}
						>
							Add
						</Button>
					</div>

					<div className="flex flex-col gap-3">
						{isLoading && <Spinner className="pt-30" />}
						{sortedPosts.map((post) => (
							<Card
								key={post.id}
								style={{
									backgroundColor: `var(--card-background_${getRandomInt()})`,
								}}
								className="max-w-[500px] min-h-55 min-w-[300px] p-2 bordered border-1 border-cyan-950"
								isBlurred
							>
								<CardBody className="space-y-2 text-sm text-default-500 flex flex-col justify-between">
									<div className="flex flex-col gap-20 items-end justify-between">
										<Link
											href={`/list/${post.id}`}
											className=" font-semibold mb-2 text-3xl leading-6 text-cyan-950"
										>
											{post.description || "description"}
										</Link>

										<Button
											style={{
												backgroundColor: `var(--card-background_${getRandomInt()})`,
											}}
											className="min-w-fit w-4/8 bordered border-1 border-cyan-950 text-xl text-cyan-950"
											as={Link}
											href={`/list/${post.id}`}
										>
											Discover
											<span className="ml-15px md:mb-2 text-2xl">→</span>
										</Button>
									</div>
									<div>
										<Divider />

										<div className="flex justify-between">
											<p>{post.title}</p>
											<p>{post.author}</p>
										</div>
									</div>
								</CardBody>
							</Card>
						))}
					</div>

					<CreateModal
						isOpen={isLoginOpen}
						onClose={() => setIsLoginOpen(false)}
					/>
				</>
			)}

			{!isLoading && !isAuth && (
				<div className="flex flex-col justify-center items-center pt-20">
					<p className="text-gray-600">Authorization error</p>
					<div className="pt-6">
						<Button as={Link} href="/">
							Go to profile
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default ListPage;
