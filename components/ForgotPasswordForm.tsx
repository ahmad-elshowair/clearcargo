"use client";
import { forgotPassword } from "@/actions/auth";
import { ForgotPasswordSchema } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
	const { toast } = useToast();
	const form = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: ForgotPasswordFormData) => {
		try {
			const formData = new FormData();
			formData.append("email", data.email);

			const result = await forgotPassword(formData);
			if (result.status === "error") {
				toast({
					title: "Forgot Password",
					description: result.message,
					variant: "destructive",
				});
			} else {
				toast({
					title: "Forgot Password",
					description: result.message,
				});
			}
		} catch (error) {
			toast({
				title: "Error",
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
						className="font-bold w-4/12 text-white bg-gray-500 hover:bg-gray-700">
						Send
					</Button>
				</section>
			</form>
		</Form>
	);
};

export default ForgotPasswordForm;
