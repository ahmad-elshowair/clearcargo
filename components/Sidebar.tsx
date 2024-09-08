import { Logo } from "@/components/Logo";

const Sidebar = async () => {
	return (
		<>
			<section className="w-full h-fit lg:h-screen lg:w-64 sticky top-0">
				<aside className="flex h-full flex-col px-3 py-4 md:px-2">
					<section className="mb-2 flex h-20 items-end justify-start rounded-md bg-emerald-300 p-4 lg:h-40">
						<Logo />
					</section>
					<section className="flex grow flex-row justify-between space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
						{/* <NavLinks /> */}
						<div className="hidden h-auto w-full grow rounded-md bg-green-100 md:block shadow" />
						{/* <AuthLinks /> */}
					</section>
				</aside>
			</section>
		</>
	);
};

export default Sidebar;
