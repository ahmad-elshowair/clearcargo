"use client";
import { resetPassword } from "@/actions/auth";
import { ResetPasswordSchema } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
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

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordForm = () => {
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const searchParams = useSearchParams();
	const code = searchParams.get("code");

	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(ResetPasswordSchema),
	});

	const onSubmit = async (data: ResetPasswordFormData) => {
		setLoading(true);
		if (!code) {
			toast({
				title: (
					<h1 className="font-extrabold text-lg text-red-800">
						RESET PASSWORD ERROR
					</h1>
				),
				description: (
					<div className="bg-red-100 p-4 rounded-md w-[350px]">
						<p className="text-md font-bold text-red-500">Missing Code</p>
					</div>
				),
				duration: 5000,
				className: "border-none bg-red-500/80",
			});
			return;
		}

		try {
			const formData = new FormData();
			formData.append("new_password", data.new_password);
			formData.append("code", code);

			const result = await resetPassword(formData);
			if (result.status === "error") {
				console.error("ERROR RESET PASSWORD FORM: ", result.message);
				toast({
					title: (
						<h1 className="font-extrabold text-lg text-red-800">
							RESET PASSWORD ERROR
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
							RESET PASSWORD SUCCESS
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
			}
		} catch (error) {
			console.error(error);
			toast({
				title: (
					<h1 className="font-extrabold text-lg text-red-800">
						RESET PASSWORD ERROR
					</h1>
				),
				description: (
					<div className="bg-red-100 p-4 rounded-md w-[350px]">
						<p className="text-md font-bold text-red-500">
							{(error as Error).message}
						</p>
					</div>
				),
				duration: 5000,
				className: "border-none bg-red-500/80",
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
							name="new_password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold text-white">
										New Password
									</FormLabel>
									<FormControl>
										<Input
											placeholder="********"
											{...field}
											type="password"
											className="bg-green-200 h-10"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="mb-5">
						<FormField
							control={form.control}
							name="confirm_password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg font-bold text-white">
										Confirm Password
									</FormLabel>
									<FormControl>
										<Input
											placeholder="********"
											{...field}
											type="password"
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
						aria-disabled={loading}
						disabled={loading}>
						{loading ? "Resetting..." : "Reset Password"}
					</Button>
				</section>
			</form>
		</Form>
	);
};

export default ResetPasswordForm;
