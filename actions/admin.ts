"use server";
import { fetchCustomerByEmail } from "@/actions/customer";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TAdminResult } from "@/types/admin";
import { revalidatePath } from "next/cache";

// CREATE CUSTOMER
export const createCustomer = async (
	formData: FormData,
): Promise<TAdminResult> => {
	const supabase = await createSupabaseServerClient();
	const adminSupabase = createSupabaseAdminClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const first_name = formData.get("first_name") as string;
	const surname = formData.get("surname") as string;
	const date_of_birth = formData.get("date_of_birth") as string;
	const mobile_number = formData.get("mobile_number") as string;
	const type = formData.get("type") as string;

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (user?.user_metadata.type !== "admin") {
		console.error("check admin error", error);
		return {
			status: "error",
			message: `Unauthorized: Only admins can create customers: ${error?.message}`,
		};
	}
	const UserResponse = await fetchCustomerByEmail(email);
	if (UserResponse.status === "success") {
		return {
			status: "error",
			message: "CUSTOMER WITH THIS EMAIL ALREADY EXISTS",
		};
	}
	try {
		const { error } = await adminSupabase.auth.admin.createUser({
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
		revalidatePath("/dashboard/customers");
		return {
			status: "success",
			message: "CUSTOMER CREATED SUCCESSFULLY !",
		};
	} catch (error) {
		console.error("Error in createCustomer:", error);
		return {
			status: "error",
			message: `An unexpected error occurred: ${error} `,
		};
	}
};

// FETCH ALL ADMINS
export const fetchAllAdmins = async (): Promise<TAdminResult> => {
	try {
		const supabase = createSupabaseAdminClient();
		const { data: admins, error } = await supabase.rpc("fetch_admin_users");
		if (error) {
			console.error("Error fetching customers:", error);
			return {
				status: "error",
				message: error.message,
			};
		}

		return {
			status: "success",
			data: admins,
			message: "FETCHED ALL ADMINS SUCCESSFULLY !",
		};
	} catch (error) {
		console.error("Error in fetchAllAdmins:", error);
		return {
			status: "error",
			message: `An unexpected error occurred: ${error} `,
		};
	}
};

// DELETE CUSTOMER
export const deleteCustomer = async (id: string): Promise<TAdminResult> => {
	try {
		const supabase = createSupabaseAdminClient();
		const { error } = await supabase.auth.admin.deleteUser(id);
		if (error) {
			console.error("Error deleting customer:", error);
			return {
				status: "error",
				message: error.message,
			};
		}
		revalidatePath("/dashboard/customers");
		return {
			status: "success",
			message: "CUSTOMER DELETED SUCCESSFULLY !",
		};
	} catch (error) {
		console.error("Error in deleteCustomer:", error);
		return {
			status: "error",
			message: `An unexpected error occurred: ${error} `,
		};
	}
};
