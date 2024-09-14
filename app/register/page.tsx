import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";

const RegisterPage = () => {
	return (
		<section className="lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-4 w-full">
			<section className="rounded-lg bg-gray-300/35 shadow h-full p-10 md:p-20 border border-green-400/50">
				<section className="flex flex-col md:flex-row gap-4 justify-center items-center h-full">
					<section className="flex flex-col bg-green-500 h-full w-3/6 px-8 rounded-xl justify-center">
						<h2 className="text-center text-slate-800 text-3xl font-bold mb-10">
							Welcome to ClearCargo
						</h2>
						<RegisterForm />
					</section>
					<section className="flex flex-col items-center justify-center w-2/5 h-full">
						<Image
							src={
								"https://mcqcttzcvnupvxeptsyf.supabase.co/storage/v1/object/public/ClreaCargo/images/ClearCargo-logo.png"
							}
							height={500}
							width={400}
							alt="Logo image"
						/>
						<h1 className="text-6xl font-bold m-0">
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
