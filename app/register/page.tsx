import RegisterForm from "@/components/RegisterForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
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
		<section className="h-screen p-1 md:p-4 w-full">
			<section className="rounded-lg bg-gray-300/35 shadow h-full p-4 md:p-10 lg:p-20 border border-green-400/50">
				<section className="flex flex-col md:flex-row gap-4 justify-center items-center h-full">
					<section className="flex flex-col bg-green-500 lg:h-full w-full md:w-2/3 lg:w-3/5 px-3 md:px-4 lg:px-8 py-10 md:py-10 lg:py-20 rounded-xl lg:justify-center order-2 md:order-1">
						<h2 className="text-center text-slate-800 text-xl lg:text-3xl font-bold lg:mb-10 mb-4">
							Welcome to ClearCargo
						</h2>
						<RegisterForm />
					</section>
					<section className="flex flex-col items-center justify-center md:w-2/5 h-full order-1 md:order-2">
						<Image
							src={
								"https://dwxqnygcejwrtodsggza.supabase.co/storage/v1/object/public/ClearCargo/images/ClearCargo-logo.png"
							}
							height={500}
							width={400}
							alt="Logo image"
							className="w-[150px] md:w-[350px] lg:w-[500px]"
						/>
						<h1 className="text-4xl md:text-5xl font-bold m-0">
							<span className="text-green-500">Clear</span>
							Cargo
						</h1>
					</section>
				</section>
			</section>
		</section>
	);
};

export default RegisterPage;
