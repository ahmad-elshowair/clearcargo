"use client";
import { login } from "@/actions/auth";
import { useToast } from "@/components/hooks/use-toast";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { z } from "zod";
import { Button } from "./ui/button";

type LoginFormData = z.infer<typeof loginSchema>;
export const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append("email", data.email);
		formData.append("password", data.password);

		try {
			const result = await login(formData);

			if (result.status === "error") {
				toast({
					title: "LOGIN ERROR",
					description: (
						<div className="bg-red-100 p-4 rounded-md w-[360px] shadow shadow-red-500/50">
							<p className="text-md font-bold text-red-500">{result.message}</p>
						</div>
					),
					duration: 5000,
					className:
						"border-none bg-red-500/80 font-extrabold text-lg text-white",
				});
			} else {
				toast({
					title: "LOGIN SUCCESS",
					description: (
						<div className="bg-green-100 p-4 rounded-md w-[350px] shadow shadow-green-500/50">
							<p className="text-md font-bold text-green-500">
								{result.message}
							</p>
						</div>
					),
					duration: 5000,
					className:
						"border-none bg-green-500/80 text-lg text-white font-extrabold",
				});
				router.push("/dashboard/clearances");
			}
		} catch (error) {
			console.error("Error while logging in", error);
			toast({
				title: "LOGIN ERROR",
				description: (
					<div className="bg-red-100 p-4 rounded-md w-[350px] shadow shadow-red-500">
						<p className="text-md font-bold text-red-500">
							{(error as Error).message}
						</p>
					</div>
				),
				duration: 5000,
				className:
					"border-none bg-red-500/80 text-lg text-white font-extrabold",
			});
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<section className="mb-10">
					<div className="mb-5">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold text-white">
										Email
									</FormLabel>
									<FormControl>
										<Input
											placeholder="example@gmail.com"
											{...field}
											className="bg-green-200 h-10"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold text-white">
										Password
									</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={showPassword ? "text" : "password"}
												placeholder="********"
												{...field}
												className="bg-green-200 h-10"
											/>
											<button
												type="button"
												className="absolute inset-y-0 right-0 pr-3 flex items-center"
												onClick={togglePasswordVisibility}>
												{showPassword ? (
													<FaEyeSlash className="h-5 w-5 text-gray-500" />
												) : (
													<FaEye className="h-5 w-5 text-gray-500" />
												)}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>
				<section className="w-full flex flex-col gap-10 items-center justify-between">
					<Button
						type="submit"
						className="font-bold w-full lg:w-4/12  text-white bg-gray-700 hover:bg-gray-900"
						disabled={isLoading}>
						{isLoading ? "Loading..." : "Login"}
					</Button>
					<div className="flex sm:flex-row flex-col justify-between lg:justify-center items-center gap-4 lg:gap-20 text-sm">
						<Link
							href={"/forgot-password"}
							className="text-slate-500 hover:text-slate-600 hover:underline">
							Forgot Password?
						</Link>
						<Link
							href={"/register"}
							className="text-slate-500 hover:text-slate-600 hover:underline">
							Create an account!
						</Link>
					</div>
				</section>
			</form>
		</Form>
	);
};
