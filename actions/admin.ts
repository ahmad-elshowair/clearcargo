"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuthResult } from "@/types/auth";
import { fetchUserByEmail } from "./user";

export const createCustomer = async (
	formData: FormData,
): Promise<AuthResult> => {
	const supabase = await createSupabaseServerClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const first_name = formData.get("first_name") as string;
	const surname = formData.get("surname") as string;
	const date_of_birth = formData.get("date_of_birth") as string;
	const mobile_number = formData.get("mobile_number") as string;
	const type = formData.get("type") as string;

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user?.user_metadata.type !== "admin") {
		return {
			status: "error",
			message: "Unauthorized: Only admins can create customers",
		};
	}
	const UserResponse = await fetchUserByEmail(email);
	if (UserResponse.status === "success") {
		return {
			status: "error",
			message: "CUSTOMER WITH THIS EMAIL ALREADY EXISTS",
		};
	}
	try {
		const { error } = await supabase.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
			user_metadata: {
				first_name,
				surname,
				date_of_birth,
				mobile_number,
				type,
			},
		});

		if (error) {
			console.error(`ERROR CREATING CUSTOMER: ${error.message}`);
			return {
				status: "error",
				message: error.message,
			};
		}

		return {
			status: "success",
			message: "Customer created successfully, PLEASE VERIFY EMAIL TO LOGIN",
		};
	} catch (error) {
		console.error("Error in createCustomer:", error);
		return {
			status: "error",
			message: `An unexpected error occurred: ${error} `,
		};
	}
};
