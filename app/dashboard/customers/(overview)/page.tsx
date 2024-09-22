import { fetchAllUser } from "@/actions/user";
import CustomersList from "@/components/dashboard/customers/CustomersList";
import Search from "@/components/Search";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Customers",
	description: "List of all customers",
};

const CustomersPage = async () => {
	const { data } = await fetchAllUser();
	return (
		<section className="flex lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-4 w-full flex-col gap-3">
			<h1 className="md:mt-20 text-3xl font-bold mb-4 md:mb-8">Customers</h1>
			<section className="flex items-center justify-between gap-2">
				<Search placeholder="Find a Customer" />
				<Link
					href={"/dashboard/customers/create"}
					className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 text-gray-500 focus-visible:outline-green-600 hover:bg-green-600 hover:text-green-50 duration-200 ease-in-out">
					Create
				</Link>
			</section>
			<Suspense>
				<CustomersList users={data} />
			</Suspense>
			<section className="mt-5 flex w-full justify-center">
				{/* here goes the pagination  */}
			</section>
		</section>
	);
};

export default CustomersPage;
