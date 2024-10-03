import Breadcrumb from "@/components/Breadcrumb";
import { Suspense } from "react";

const page = ({ params }: { params: { id: string } }) => {
	const { id } = params;
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
				<Suspense>
					<Breadcrumb breadcrumbs={breadcrumbs} />
				</Suspense>
			</section>
		</section>
	);
};

export default page;
