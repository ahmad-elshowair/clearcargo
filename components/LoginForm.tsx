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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";

type LoginFormData = z.infer<typeof loginSchema>;
export const LoginForm = () => {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		const formData = new FormData();
		formData.append("email", data.email);
		formData.append("password", data.password);

		const result = await login(formData);

		if (result.status === "error") {
			toast({
				title: "Login",
				description: result.message,
				variant: "destructive",
			});
		} else {
			toast({
				title: "Login",
				description: result.message,
			});
			router.push("/");
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
										<Input
											type="password"
											placeholder="********"
											{...field}
											className="bg-green-200 h-10"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>
				<section className="flex flex-col gap-6 items-center justify-between">
					<Button type="submit" className="font-bold w-4/12">
						Login
					</Button>
					<div className="flex justify-center gap-20">
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
