import { getOnePost } from "@/actions/post";

export default async function OnePost({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const { post, error } = await getOnePost(id);

	return (
		<div className="max-w-[500px] min-w-[300px] mx-auto flex flex-col gap-4 mb-8">
			<div className="bg-amber-200 p-6 rounded-2xl shadow-md border border-amber-300">
				{post && (
					<>
						<h2 className="text-xl font-bold text-gray-900 mb-4 text-center leading-tight">
							{post.title}
						</h2>
						<p className="text-gray-800 leading-relaxed whitespace-pre-line">
							{post.content}
						</p>
					</>
				)}

				{error && (
					<p className="text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200 text-center">
						{error}
					</p>
				)}
			</div>
		</div>
	);
}
