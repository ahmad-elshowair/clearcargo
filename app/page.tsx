import { Logo } from "@/components/Logo";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default async function Home() {
	const supabase = await createSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const session = {
		isLoggedIn: !!user,
		name: `${user?.user_metadata.first_name} ${user?.user_metadata.surname}`,
	};
	return (
		<section className="lg:min-h-screen xl:min-h-screen h-screen p-1 sm:p-2 md:p-4 lg:p-6 w-full">
			<div className="grid gap-6 rounded-lg bg-gray-300/35 shadow h-full justify-items-stretch p-2 sm:p-4 border border-green-400/50">
				<section className="flex justify-self-center md:justify-self-start items-center">
					<Logo fontSize="text-[45px]" />
				</section>
				<section className="w-full flex justify-center items-center">
					{session.isLoggedIn ? (
						<div className="flex flex-col gap-6">
							<h1 className="text-neutral-700 font-bold">
								<span className="">Welcome back </span>
								<span className="text-green-400 ml-1">{session?.name}</span>
							</h1>
							<Link
								href="/dashboard"
								className="flex justify-center text-lg font-bold items-center gap-2 hover:text-green-500 group duration-500 ease-in-out">
								<span className="group-hover:mr-4">Check Your Shipments</span>
								<i className="text-2xl">
									<BsArrowRight />
								</i>
							</Link>
						</div>
					) : (
						<article className="flex flex-col gap-6 text-center md:text-current ">
							<h1 className="text-xl md:text-3xl font-bold md:font-extra-bold">
								Welcome to ClearCargo
							</h1>
							<p className="flex justify-center gap-1 text-slate-700 font-normal text-sm md:text-lg">
								<span>Please</span>
								<Link
									href={"/login"}
									className=" text-green-500 hover:underline">
									Login
								</Link>
								<span>to access your shipments.</span>
							</p>
						</article>
					)}
				</section>
				<section className=" justify-self-center md:justify-self-end flex gap-4 items-center md:items-end">
					{session.isLoggedIn ? (
						<LogoutButton />
					) : (
						<>
							<Link href="/register">
								<Button className="font-bold bg-slate-800 text-white hover:bg-slate-900">
									Register
								</Button>
							</Link>
							<Link href="/login">
								<Button className="font-bold bg-green-500 text-white hover:bg-green-600">
									Login
								</Button>
							</Link>
						</>
					)}
				</section>
			</div>
		</section>
	);
}
