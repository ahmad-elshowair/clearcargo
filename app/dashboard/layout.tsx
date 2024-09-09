import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<section className="flex flex-col lg:flex-row md:overflow-hidden">
			<Sidebar />
			<section className="flex-grow md:overflow-y-auto">{children}</section>
		</section>
	);
};

export default DashboardLayout;
