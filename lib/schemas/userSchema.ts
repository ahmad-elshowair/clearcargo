import { z } from "zod";

export const UserSchema = z.object({
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
	type: z.enum(["customer", "admin"], {
		invalid_type_error: "Please choose the type of the customer!",
	}),
});

export type CreateCustomerData = z.infer<typeof UserSchema>;

// Omit 'password' and 'type' for updating customer information
export const UpdateCustomerSchema = UserSchema.omit({
	password: true,
	type: true,
});
export type UpdateCustomerData = z.infer<typeof UpdateCustomerSchema>;

export const ChangePasswordSchema = z
	.object({
		old_password: z.string().min(1, { message: "Old password is required." }),
		new_password: z
			.string()
			.min(8, { message: "Be at least 8 characters long" })
			.regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
			.regex(/[0-9]/, { message: "Contain at least one number" })
			.regex(/[^a-zA-Z0-9]/, {
				message: "Contain at least one special character!",
			}),
		confirm_new_password: z
			.string()
			.min(1, { message: "Confirm new password is required." }),
	})
	.refine(
		(data) => {
			if (data.new_password !== data.confirm_new_password) {
				return false;
			}
			return true;
		},
		{ message: "New password and confirm new password do not match!" },
	);

export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;
