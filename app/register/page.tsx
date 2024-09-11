import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
	const error = null;
	return (
		<section className="lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-4 w-full">
			<section className="rounded-lg bg-gray-300/35 shadow h-full p-20 border border-green-400/50">
				<section className="flex flex-col md:flex-row gap-4 justify-center items-center h-full">
					<section className="flex flex-col bg-green-500 h-full w-3/5 px-8 py-20 rounded-xl">
						<h2 className="text-center text-slate-800 text-3xl font-bold mb-10">
							Welcome to ClearCargo
						</h2>
						<form action="">
							<section className="flex flex-col justify-center">
								<div className="flex flex-col md:flex-row mb-10 gap-8">
									<div className="grid items-center gap-1.5 w-full">
										<Label
											htmlFor="first_name"
											className="text-lg text-white font-semibold">
											First name
										</Label>
										<Input
											type="text"
											id="first_name"
											placeholder="Ali"
											aria-describedby="first_name-error"
											className="bg-green-200 border-0 text-slate-800 h-12"
										/>
										{error && (
											<div
												className="text-red-500 bg-red-100/20 p-1 rounded-md h-6 flex items-center"
												id="first_name-error"
												aria-atomic="true"
												aria-live="polite">
												{/* first_name error goes  */}
											</div>
										)}
									</div>
									<div className="grid w-full items-center gap-1.5 ">
										<Label
											htmlFor="surname"
											className="text-lg text-white font-semibold">
											Surname
										</Label>
										<Input
											type="text"
											id="surname"
											placeholder="Mohamed"
											aria-describedby="surname-error"
											className="bg-green-200 border-0 text-slate-800 h-12"
										/>
										{error && (
											<div
												className="text-red-500 bg-red-100/20 p-1 rounded-md h-6 flex items-center"
												id="surname-error"
												aria-atomic="true"
												aria-live="polite">
												{/* surname error goes  */}
											</div>
										)}
									</div>
								</div>

								<div className="flex flex-col md:flex-row mb-10 gap-8">
									<div className="grid w-full items-center gap-1.5">
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
										{error && (
											<div
												className="text-red-500 bg-red-100/20 p-1 rounded-md h-6"
												id="email-error"
												aria-atomic="true"
												aria-live="polite">
												{/* email error goes  */}
											</div>
										)}
									</div>
									<div className="grid w-full items-center gap-1.5">
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
										{error && (
											<div
												className="text-red-500 bg-red-100/20 p-1 rounded-md h-6"
												id="password-error"
												aria-atomic="true"
												aria-live="polite">
												{/* password error goes  */}
											</div>
										)}
									</div>
								</div>

								<div className="flex flex-col md:flex-row mb-10 gap-8">
									<div className="grid w-full items-center gap-1.5">
										<Label
											htmlFor="date_of_birth"
											className="text-lg text-white font-semibold">
											DOB
										</Label>
										<Input
											type="date"
											id="date_of_birth"
											placeholder="2-10-1993"
											aria-describedby="date_of_birth-error"
											className="bg-green-200 border-0 text-slate-800 h-12 appearance-none"
										/>
										{error && (
											<div
												className="text-red-500 bg-red-100/20 p-1 rounded-md h-6"
												id="date_of_birth-error"
												aria-atomic="true"
												aria-live="polite">
												{/* date_of_birth error goes  */}
											</div>
										)}
									</div>
									<div className="grid w-full items-center gap-1.5">
										<Label
											htmlFor="mobile_number"
											className="text-lg text-white font-semibold">
											Mobile Number
										</Label>
										<Input
											type="phone"
											id="mobile_number"
											placeholder="1234567890"
											aria-describedby="mobile_number-error"
											className="bg-green-200 border-0 text-slate-800 h-12"
										/>
										{error && (
											<div
												className="text-red-500 bg-red-100/20 p-1 rounded-md h-6"
												id="mobile_number-error"
												aria-atomic="true"
												aria-live="polite">
												{/* mobile_number error goes  */}
											</div>
										)}
									</div>
								</div>
							</section>
							<section className="flex flex-col gap-12 items-center">
								<Button className="bg-slate-800 text-white text-lg font-bold hover:bg-slate-900 max-w-40 w-full">
									Register
								</Button>
								<Link
									href={"/login"}
									className="text-gray-700 hover:text--400 hover:underline">
									I have an account!
								</Link>
							</section>
						</form>
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
