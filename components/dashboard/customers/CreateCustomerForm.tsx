"use client";
import { createCustomer } from "@/actions/admin";
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
import { CreateCustomerData, UserSchema } from "@/lib/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";

const CreateCustomerForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<CreateCustomerData>({
		resolver: zodResolver(UserSchema),
	});

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const onSubmit = async (data: CreateCustomerData) => {
		setIsLoading(true);

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});
		try {
			const result = await createCustomer(formData);
			if (result.status === "error") {
				toast({
					title: (
						<h1 className="font-extrabold text-lg text-red-800">
							CREATE CUSTOMER FAILED
						</h1>
					),
					description: (
						<div className="bg-red-100 p-4 rounded-md w-[350px]">
							<p className="text-md font-bold text-red-500">{result.message}</p>
						</div>
					),
					duration: 5000,
					className: "border-none bg-red-500/80",
				});
			} else {
				toast({
					title: (
						<h1 className="font-extrabold text-lg text-green-800">
							CREATE CUSTOMER SUCCESS
						</h1>
					),
					description: (
						<div className="bg-green-100 p-4 rounded-md w-[350px]">
							<p className="text-md font-bold text-green-500">
								{result.message}
							</p>
						</div>
					),
					duration: 5000,
					className: "border-none bg-green-500/80",
				});

				router.push("/dashboard/customers");
			}
		} catch (error) {
			console.error(`Error creating customer: ${error}`);
			toast({
				title: "CREATING CUSTOMER FAILED",
				description: `ERROR creating customer: ${error}`,
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<section className="bg-green-100 p-4 md:p-6 rounded-lg">
					<div className="mb-3">
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-md font-bold text-green-900">
										First Name
									</FormLabel>
									<FormControl>
										<Input placeholder="Zak" {...field} className="bg-white" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="mb-3">
						<FormField
							control={form.control}
							name="surname"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-md font-bold text-green-900">
										Surname
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Mohamed"
											{...field}
											className="bg-white"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="mb-3">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-md font-bold text-green-900">
										Email
									</FormLabel>
									<FormControl>
										<Input
											placeholder="example@gmail.com"
											{...field}
											className="bg-white"
											type="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="mb-3 relative">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-md font-bold text-green-900">
										Password
									</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												placeholder="*********"
												{...field}
												className="bg-white pr-10"
												type={showPassword ? "text" : "password"}
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

					<div className="mb-3 flex flex-col md:flex-row gap-3">
						<FormField
							control={form.control}
							name="date_of_birth"
							render={({ field }) => (
								<FormItem className="md:w-1/2">
									<FormLabel className="text-md font-bold text-green-900">
										Date of birth
									</FormLabel>
									<FormControl>
										<Input {...field} className="bg-white" type="date" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="mobile_number"
							render={({ field }) => (
								<FormItem className="md:w-1/2">
									<FormLabel className="text-md font-bold text-green-900">
										Mobile Number
									</FormLabel>
									<FormControl>
										<Input
											placeholder="00201234567890"
											{...field}
											className="bg-white"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<fieldset className="mb-3">
						<legend className="mb-3 block text-md font-bold text-green-900">
							Type of Customer
						</legend>
						<section className="flex flex-col md:flex-row gap-10 items-center rounded-md border border-green-200 bg-white px-[14px] py-3">
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem className="flex items-center gap-4 space-y-0">
										<FormControl>
											<Input
												type="radio"
												{...field}
												className="w-6 h-6"
												value={"customer"}
											/>
										</FormControl>
										<FormLabel className="flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 font-bold text-green-900">
											<span className="text-md hidden md:inline-block">
												Customer
											</span>
											<FaRegUser className="h-5 w-5" />
										</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem className="flex items-center gap-4 space-y-0">
										<FormControl>
											<Input
												type="radio"
												{...field}
												className="w-6 h-6"
												value={"admin"}
											/>
										</FormControl>
										<FormLabel className="flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 font-bold text-green-900">
											<span className="hidden md:inline">Admin</span>
											<RiAdminLine className="h-5 w-5" />
										</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>
					</fieldset>
				</section>
				<section className="mt-4 flex justify-end gap-4">
					<Link
						href={"/dashboard/customers"}
						className="px-8 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-200 transition-colors duration-200 py-4 rounded-md">
						Cancel
					</Link>
					<Button
						type="submit"
						className="h-fit rounded-md bg-green-500 py-4 px-8 text-sm font-medium transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-50 active:bg-green-600 duration-200 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 text-green-50"
						aria-disabled={isLoading}>
						{isLoading ? "Creating..." : "Create Customer"}
					</Button>
				</section>
			</form>
		</Form>
	);
};

export default CreateCustomerForm;
