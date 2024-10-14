import { fetchAllPorts } from "@/actions/port";
import Breadcrumb from "@/components/Breadcrumb";
import { CreateClearanceForm } from "@/components/dashboard/clearances/CreateClearanceForm";
import { Suspense } from "react";

const CreateClearancePage = async () => {
	const breadcrumbs = [
		{
			label: "Clearances",
			href: "/dashboard/clearances",
		},
		{
			label: "Create Clearance",
			href: "/dashboard/clearances/create",
			isActive: true,
		},
	];

	const { data } = await fetchAllPorts();
	return (
		<section className="flex lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-4 w-full flex-col gap-3">
			<section className="lg:mt-20">
				<Suspense>
					<Breadcrumb breadcrumbs={breadcrumbs} />
				</Suspense>
			</section>
			<Suspense>
				{/* create clearance form goes here  */}
				<CreateClearanceForm ports={data} link="/dashboard/clearances" />
			</Suspense>
		</section>
	);
};

export default CreateClearancePage;
