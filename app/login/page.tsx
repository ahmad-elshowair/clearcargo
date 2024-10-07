"use server";
import { LoginForm } from "@/components/LoginForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const LoginPage = async () => {
	const supabase = await createSupabaseServerClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error) {
		console.error("Error fetching user login: ", error);
	}

	if (user) {
		redirect("/");
	}
	return (
		<section className="h-screen bg-gray-50 p-1 sm:p-2 md:p-4 w-full">
			<section className="flex justify-center rounded-lg bg-gray-300/35 shadow h-full px-3 py-6 lg:p-20 border border-green-400/50">
				<section className="flex flex-col md:flex-row justify-center md:items-center h-full w-full gap-8">
					<section className="flex flex-col items-center justify-center lg:w-2/5 md:h-full md:w-1/3">
						<Image
							src={
								"https://dwxqnygcejwrtodsggza.supabase.co/storage/v1/object/public/ClearCargo/images/ClearCargo-logo.png"
							}
							height={500}
							width={400}
							alt="Logo image"
							className="w-[150px] md:w-[350px] lg:w-[500px] "
						/>
						<h1 className="text-4xl md:text-5xl font-bold m-0">
							<span className="text-green-500">Clear</span>
							Cargo
						</h1>
					</section>
					<section className="flex flex-col bg-green-500 lg:h-full md:w-6/12 px-3 md:px-6 lg:px-12 py-10 md:py-20 lg:py-20 rounded-xl justify-center">
						<h2 className="text-center text-slate-800 text-xl lg:text-3xl font-bold lg:mb-10 mb-4">
							Welcome Back
						</h2>
						<LoginForm />
					</section>
				</section>
			</section>
		</section>
	);
};

export default LoginPage;
