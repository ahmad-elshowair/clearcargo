import { roboto_mono } from "@/components/fonts";
import Sidebar from "@/components/Sidebar";
import clsx from "clsx";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<section
			className={clsx(
				roboto_mono.className,
				"flex flex-col lg:flex-row md:overflow-hidden",
			)}>
			<Sidebar />
			<section className="flex-grow md:overflow-y-auto">{children}</section>
		</section>
	);
};

export default DashboardLayout;
