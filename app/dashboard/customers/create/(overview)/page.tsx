import Breadcrumb from "@/components/Breadcrumb";
import CreateCustomerForm from "@/components/dashboard/customers/CreateCustomerForm";
import { Suspense } from "react";

const CreateCustomerPage = () => {
	const breadcrumbs = [
		{
			label: "Customers",
			href: "/dashboard/customers",
		},
		{
			label: "Create Customer",
			href: "/dashboard/customers/create",
			isActive: true,
		},
	];
	return (
		<section className="flex lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-5 w-full flex-col gap-3">
			<section className="mt-10">
				<Suspense fallback={<div>Loading...</div>}>
					<Breadcrumb breadcrumbs={breadcrumbs} />
				</Suspense>
			</section>
			<Suspense fallback={<div>Loading...</div>}>
				{/* create customer form goes here  */}
				<CreateCustomerForm />
			</Suspense>
		</section>
	);
};

export default CreateCustomerPage;
