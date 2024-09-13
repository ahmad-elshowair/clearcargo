"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { register } from "@/actions/auth";
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
import { useToast } from "@/hooks/use-toast";
import { registerSchema } from "@/utils/schemas/authSchema";
import { useRouter } from "next/navigation";
import { z } from "zod";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			confirm_password: "",
			first_name: "",
			surname: "",
			date_of_birth: "",
			mobile_number: "",
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		const result = await register(formData);

		if (result.status == "error") {
			toast({
				title: "Registration",
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
				{/* First Name */}
				<FormField
					control={form.control}
					name="first_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder="First Name" {...field} />
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
						<FormItem>
							<FormLabel>Surname</FormLabel>
							<FormControl>
								<Input placeholder="Surname" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Email" {...field} />
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
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Confirm Password */}
				<FormField
					control={form.control}
					name="confirm_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirm Password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Date of Birth */}
				<FormField
					control={form.control}
					name="date_of_birth"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date of Birth</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
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
						<FormItem>
							<FormLabel>Mobile Number</FormLabel>
							<FormControl>
								<Input placeholder="Mobile Number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Register</Button>
			</form>
		</Form>
	);
}
