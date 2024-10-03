import Breadcrumb from "@/components/Breadcrumb";
import { Suspense } from "react";

const EditCustomerPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const breadcrumbs = [
		{
			label: "Customers",
			href: "/dashboard/customers",
		},
		{
			label: "Edit Customer",
			href: `/dashboard/customers/${id}/edit`,
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

export default EditCustomerPage;
