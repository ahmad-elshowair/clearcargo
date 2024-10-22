"use client";
import { forgotPassword } from "@/actions/auth";
import { ForgotPasswordSchema } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "./hooks/use-toast";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

const ForgotPasswordForm = () => {
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const form = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: ForgotPasswordFormData) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("email", data.email);

			const result = await forgotPassword(formData);
			if (result.status === "error") {
				toast({
					title: "FORGOT PASSWORD ERROR",
					description: (
						<div className="bg-red-100 p-4 rounded-md w-[350px] shadow shadow-red-500">
							<p className="text-md font-bold text-red-500">{result.message}</p>
						</div>
					),
					duration: 5000,
					className:
						"border-none bg-red-500/80 text-lg text-white font-extrabold",
				});
			} else {
				toast({
					title: "FORGOT PASSWORD",
					description: (
						<div className="bg-green-100 p-4 rounded-md w-[350px] shadow shadow-green-500">
							<p className="text-md font-bold text-green-500">
								{result.message}
							</p>
						</div>
					),
					duration: 5000,
					className:
						"border-none bg-green-500/80 text-lg text-white font-extrabold",
				});
			}
		} catch (error) {
			toast({
				title: "FORGOT PASSWORD ERROR",
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
			setLoading(false);
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
				</section>
				<section className="flex flex-col gap-10 items-center justify-between">
					<Button
						type="submit"
						className="font-bold w-4/12 text-white bg-gray-500 hover:bg-gray-700"
						disabled={loading}
						aria-disabled={loading}>
						{loading ? "Sending..." : "Send"}
					</Button>
				</section>
			</form>
		</Form>
	);
};

export default ForgotPasswordForm;
