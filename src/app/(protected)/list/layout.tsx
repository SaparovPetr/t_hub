import { FC } from "react";

interface IProps {
	children: React.ReactNode;
}

const ListLayout: FC<IProps> = ({ children }) => {
	return <section>{children}</section>;
};

export default ListLayout;
