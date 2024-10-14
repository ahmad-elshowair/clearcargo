import { Logo } from "@/components/Logo";
import NavLinks from "@/components/NavLinks";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AuthLinks from "./AuthLinks";

const Sidebar = async () => {
	const supabase = await createSupabaseServerClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	console.log("the logged in user is: ", user?.user_metadata.type);

	return (
		<>
			<section className="w-screen h-fit lg:h-screen lg:w-64 sticky top-0">
				<aside className="flex h-full flex-col px-3 py-4 md:px-2">
					<section className="mb-2 flex h-20 items-end justify-start rounded-md bg-emerald-300 lg:items-center lg:p-4 lg:h-40">
						<Logo fontSize="text-[35px]" />
					</section>
					<section className="flex grow flex-row justify-between space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
						<NavLinks type={user?.user_metadata.type} />
						<div className="hidden h-auto w-full grow rounded-md bg-green-100 md:block shadow" />
						<AuthLinks
							userType={user?.user_metadata.type}
							first_name={user?.user_metadata.first_name}
						/>
					</section>
				</aside>
			</section>
		</>
	);
};

export default Sidebar;
