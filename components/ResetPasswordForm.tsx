"use client";
import { resetPassword } from "@/actions/auth";
import { ResetPasswordSchema } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
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
	const { toast } = useToast();
	const searchParams = useSearchParams();
	const code = searchParams.get("code");

	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(ResetPasswordSchema),
	});

	const onSubmit = async (data: ResetPasswordFormData) => {
		if (!code) {
			toast({
				title: "RESET PASSWORD",
				description: "MISSING CODE. PLEASE TRY AGAIN.",
				variant: "destructive",
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
					title: "RESET PASSWORD",
					description: result.message,
					variant: "destructive",
				});
			} else {
				toast({
					title: "RESET PASSWORD",
					description: result.message,
				});
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "RESET PASSWORD",
				description: (error as Error).message,
				variant: "destructive",
			});
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
						className="font-bold w-4/12 text-white bg-gray-500 hover:bg-gray-700">
						Reset Password
					</Button>
				</section>
			</form>
		</Form>
	);
};

export default ResetPasswordForm;
