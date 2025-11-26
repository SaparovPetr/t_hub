import DelButton from "@/components/UI/common/delButton";
import { FC } from "react";

interface IProps {
	children: React.ReactNode;
}

const PostLayout: FC<IProps> = ({ children }) => {
	return (
		<div className="flex flex-col gap-3">
			<DelButton />
			{children}
		</div>
	);
};

export default PostLayout;
