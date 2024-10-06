"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { register } from "@/actions/auth";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/schemas/authSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			first_name: "",
			surname: "",
			date_of_birth: "",
			mobile_number: "",
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		setLoading(true);
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		try {
			const result = await register(formData);

			if (result.status == "error") {
				toast({
					title: "Registration",
					description: result.message,
					variant: "destructive",
				});
			} else {
				toast({
					title: "Registration",
					description: result.message,
				});
				router.push("/login");
			}
		} catch (error) {
			console.error("Error while registering", error);
			toast({
				title: "Registration",
				description: `ERROR WHILE REGISTERING: ${error}`,
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<section className="mb-8 md:mb-12">
					<div className="flex items-center flex-col md:flex-row justify-center gap-3 lg:gap-8 mb-2 md:mb-4">
						{/* First Name */}
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem className="w-full md:w-1/2">
									<FormLabel className="text-xs md:text-md md:font-bold text-white">
										First Name
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Jack"
											{...field}
											className="bg-green-200 placeholder:text-xs"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Surname */}
						<FormField
							control={form.control}
							name="surname"
							render={({ field }) => (
								<FormItem className="w-full md:w-1/2">
									<FormLabel className="text-sm md:text-md md:font-bold text-white">
										Surname
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Noah"
											{...field}
											className="bg-green-200 placeholder:text-xs placeholder:md:text-sm"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex items-center flex-col md:flex-row justify-center gap-3 lg:gap-8 mb-2 md:mb-4">
						{/* Email */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="w-full md:w-1/2">
									<FormLabel className="text-sm md:text-md md:font-bold text-white">
										Email
									</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="example@example.com"
											{...field}
											className="bg-green-200 placeholder:text-xs placeholder:md:text-sm"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Password */}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="w-full md:w-1/2">
									<FormLabel className="text-sm md:text-md md:font-bold text-white">
										Password
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="**********"
											{...field}
											className="bg-green-200 placeholder:text-xs placeholder:md:text-sm"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex items-center flex-col md:flex-row justify-center gap-3 lg:gap-8 mb-2 md:mb-4">
						{/* Date of Birth */}
						<FormField
							control={form.control}
							name="date_of_birth"
							render={({ field }) => (
								<FormItem className="w-full md:w-1/2">
									<FormLabel className="text-sm md:text-md md:font-bold text-white">
										Date of Birth
									</FormLabel>
									<FormControl>
										<Input type="date" {...field} className="bg-green-200" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Mobile Number */}
						<FormField
							control={form.control}
							name="mobile_number"
							render={({ field }) => (
								<FormItem className="w-full md:w-1/2">
									<FormLabel className="text-sm md:text-md md:font-bold text-white">
										Mobile Number
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Mobile Number"
											{...field}
											className="bg-green-200 placeholder:text-xs placeholder:md:text-sm"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>

				<section className="flex items-center gap-5 ld:gap-10 flex-col md:justify-between">
					<Button
						type="submit"
						className="font-bold w-full lg:w-5/12 text-white bg-gray-500 hover:bg-gray-700"
						disabled={loading}>
						{loading ? "Registering..." : "Register"}
					</Button>
					<Link
						href={"/login"}
						className="text-sm text-slate-500 hover:text-slate-600 hover:underline">
						Already have an account!
					</Link>
				</section>
			</form>
		</Form>
	);
}
