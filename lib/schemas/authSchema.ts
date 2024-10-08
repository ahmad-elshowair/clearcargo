import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.email({ message: "Invalid email address. 'example@gmail.com'" }),
	password: z.string().min(1, { message: "Password is required!" }),
});

export const registerSchema = z.object({
	email: z
		.string()
		.email({ message: "Invalid email address. 'example@gmail.com'" }),
	password: z
		.string()
		.min(8, { message: "Be at least 8 characters long" })
		.regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
		.regex(/[0-9]/, { message: "Contain at least one number" })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Contain at least one special character!",
		}),
	first_name: z.string().min(1, { message: "First name is required." }),
	surname: z.string().min(1, { message: "Surname is required." }),
	date_of_birth: z.string().min(1, { message: "Date of birth is required." }),
	mobile_number: z.string().min(1, { message: "Mobile number is required." }),
});

export const ForgotPasswordSchema = z.object({
	email: z.string().email({ message: "Invalid Email" }),
});

export const ResetPasswordSchema = z
	.object({
		new_password: z
			.string()
			.min(8, { message: "Be at least 8 characters long" })
			.regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
			.regex(/[0-9]/, { message: "Contain at least one number" })
			.regex(/[^a-zA-Z0-9]/, {
				message: "Contain at least one special character!",
			}),
		confirm_password: z
			.string()
			.min(8, { message: "Be at least 8 characters long" }),
	})
	.refine((data) => data.new_password === data.confirm_password, {
		message: "Passwords do not match",
		path: ["confirm_password"],
	});
