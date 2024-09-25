import { z } from "zod";

export const CreateUserSchema = z.object({
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
