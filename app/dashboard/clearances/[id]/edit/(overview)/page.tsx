import { fetchClearanceById } from "@/actions/clearance";
import { fetchAllPorts } from "@/actions/port";
import Breadcrumb from "@/components/Breadcrumb";
import { UpdateClearanceForm } from "@/components/dashboard/clearances/UpdateClearanceForm";

const page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const clearanceData = await fetchClearanceById(id);

	const portsData = await fetchAllPorts();

	const breadcrumbs = [
		{
			label: "Clearances",
			href: "/dashboard/clearances",
		},
		{
			label: "Edit Clearance",
			href: `/dashboard/clearances/${id}/edit`,
			isActive: true,
		},
	];
	return (
		<section className="flex lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-4 w-full flex-col gap-3">
			<section className="mt-20">
				<Breadcrumb breadcrumbs={breadcrumbs} />
			</section>
			<UpdateClearanceForm
				ports={portsData.data}
				clearance={clearanceData.data}
			/>
		</section>
	);
};

export default page;
