import { fetchAllPorts } from "@/actions/port";
import Breadcrumb from "@/components/Breadcrumb";
import { CreateClearanceForm } from "@/components/dashboard/clearances/CreateClearanceForm";
import { Suspense } from "react";

const AdminCreateClearancePage = async () => {
	const breadcrumbs = [
		{
			label: "All Clearances",
			href: "/dashboard/all-clearances",
		},
		{
			label: "Create Clearance",
			href: "/dashboard/all-clearances/create",
			isActive: true,
		},
	];

	const { data } = await fetchAllPorts();
	return (
		<section className="flex lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-4 w-full flex-col gap-3">
			<section className="lg:mt-20">
				<Suspense fallback={<div>Loading...</div>}>
					<Breadcrumb breadcrumbs={breadcrumbs} />
				</Suspense>
			</section>
			<Suspense fallback={<div>Loading...</div>}>
				{/* create clearance form goes here  */}
				<CreateClearanceForm ports={data} />
			</Suspense>
		</section>
	);
};

export default AdminCreateClearancePage;
