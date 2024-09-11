import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
	const error = null;
	return (
		<section className="lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-4 w-full">
			<section className="rounded-lg bg-gray-300/35 shadow h-full p-20 border border-green-400/50">
				<section className="flex gap-4 justify-center items-center h-full">
					<section className="flex flex-col items-center justify-center w-3/5 h-full">
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
					<section className="flex flex-col bg-green-500 h-full w-2/5 px-8 py-20 rounded-xl">
						<h2 className="text-center text-slate-800 text-3xl font-bold mb-10">
							Welcome Back
						</h2>
						<form action="">
							<section className="flex flex-col justify-center">
								<div className="grid w-full items-center gap-1.5 mb-10">
									<Label
										htmlFor="email"
										className="text-lg text-white font-semibold">
										Email
									</Label>
									<Input
										type="email"
										id="email"
										placeholder="example"
										aria-describedby="email-error"
										className="bg-green-200 border-0 text-slate-800 h-12"
									/>
								</div>
								{error && (
									<div
										className="text-red-500 bg-red-100/20 p-1 rounded-md h-6"
										id="email-error"
										aria-atomic="true"
										aria-live="polite">
										{/* email error goes  */}
									</div>
								)}
								<div className="grid w-full items-center gap-1.5 mb-10">
									<Label
										htmlFor="password"
										className="text-lg text-white font-semibold">
										Password
									</Label>
									<Input
										type="password"
										id="password"
										placeholder="********"
										aria-describedby="password-error"
										className="bg-green-200 border-0 text-slate-800 h-12"
									/>
								</div>
								{error && (
									<div
										className="text-red-500 bg-red-100/20 p-1 rounded-md h-6"
										id="password-error"
										aria-atomic="true"
										aria-live="polite">
										{/* password error goes  */}
									</div>
								)}
							</section>
							<section className="flex flex-col gap-12 items-center">
								<Button className="bg-slate-800 text-white text-lg font-bold hover:bg-slate-900 max-w-40 w-full">
									login
								</Button>
								<div className="flex flex-col md:flex-row items-center w-full justify-center gap-28">
									<Link
										href={"/forgot-password"}
										className="text-gray-700 hover:text--400 hover:underline hover:text-white">
										forgot password
									</Link>
									<Link
										href={"/register"}
										className="text-gray-700 hover:text--400 hover:underline hover:text-white">
										create an account !
									</Link>
								</div>
							</section>
						</form>
					</section>
				</section>
			</section>
		</section>
	);
};

export default LoginPage;
