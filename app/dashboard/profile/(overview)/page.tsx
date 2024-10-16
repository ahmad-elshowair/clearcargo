import AccountTab from "@/components/dashboard/profile/AccountTab";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Suspense } from "react";

const Profile = async () => {
	const supabase = await createSupabaseServerClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<section className="flex lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-4 w-full flex-col gap-3">
			<article className="flex flex-col gap-3 my-10">
				<h1 className="text-3xl font-bold">Profile</h1>
				<p className="text-md text-gray-400">
					Manage your account settings and personal information.
				</p>
			</article>
			<Suspense fallback={<div>Loading...</div>}>
				<AccountTab user={user} />
			</Suspense>
		</section>
	);
};

export default Profile;
