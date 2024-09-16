import { Logo } from "@/components/Logo";

const NotAuthorizedPage = () => {
	return (
		<section className="lg:min-h-screen xl:min-h-screen h-screen p-4 w-full">
			<section className="rounded-lg bg-gray-300/35 shadow h-full p-10 border border-green-400/50">
				<section className="justify-self-start">
					<Logo fontSize="text-[45px]" />
				</section>
				<section className="flex justify-center items-center h-[calc(100%-200px)]">
					<h1 className="text-3xl font-bold text-green-400">
						YOU ARE NOT AUTHORIZED
					</h1>
				</section>
			</section>
		</section>
	);
};

export default NotAuthorizedPage;
