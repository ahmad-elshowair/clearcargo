import { Logo } from "@/components/Logo";
import Link from "next/link";

const NotAuthorizedPage = () => {
	return (
		<section className="lg:min-h-screen xl:min-h-screen h-screen p-4 w-full">
			<section className="rounded-lg bg-gray-300/35 shadow h-full p-10 border border-green-400/50">
				<section className="flex justify-center items-center md:justify-self-start">
					<Logo fontSize="text-[45px]" />
				</section>
				<section className="flex justify-center items-center h-[calc(100%-200px)]">
					<h1 className="text-xl sm:text-3xl font-bold text-green-400 text-center flex flex-col gap-2">
						<span>SORRY, YOU ARE NOT AUTHORIZED</span>
						<Link href="/" className="text-gray-400 hover:text-green-600">
							back to Home
						</Link>
					</h1>
				</section>
			</section>
		</section>
	);
};

export default NotAuthorizedPage;
