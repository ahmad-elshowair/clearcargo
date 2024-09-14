import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default async function Home() {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const session = { isLoggedIn: user ? true : false, name: user?.email };
	return (
		<section className="lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-4 w-full">
			<div className="grid gap-6 rounded-lg bg-gray-300/35 shadow h-full justify-items-stretch p-5 border border-green-400/50">
				<section className="justify-self-start">
					<Logo fontSize="text-[45px]" />
				</section>
				<section className="w-full flex justify-center">
					{session.isLoggedIn ? (
						<div className="flex flex-col gap-6">
							<h1 className="text-4xl text-neutral-700 font-bold">
								<span>Welcome back </span>
								<span className="text-green-400 ml-1">{session?.name}</span>
							</h1>
							<Link
								href="/dashboard/page-1"
								className="flex justify-center text-lg font-bold items-center gap-2 hover:text-green-500 group duration-500 ease-in-out">
								<span className="group-hover:mr-4">Check Your Shipments</span>
								<i className="text-2xl">
									<BsArrowRight />
								</i>
							</Link>
						</div>
					) : (
						<article className="flex flex-col gap-6">
							<h1 className="text-3xl font-bold">Welcome to ClearCargo</h1>
							<p className="flex justify-center gap-1 text-slate-700 font-normal">
								<span>Please</span>
								<Link
									href={"/login"}
									className=" text-blue-500 hover:underline">
									Login
								</Link>{" "}
								to access your shipments.
							</p>
						</article>
					)}
				</section>
				<section className="justify-self-end flex gap-4 items-end">
					{session.isLoggedIn ? (
						<Button className="text-white bg-green-500">Logout</Button>
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
