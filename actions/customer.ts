"use server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
	PaginatedResponse,
	TUser,
	TUserTable,
	UserResponse,
} from "@/types/user";
import { revalidatePath } from "next/cache";
import { logout } from "./auth";

const USERS_PER_PAGE = 5;

const supabaseAdmin = createSupabaseAdminClient();

// FETCH FILTERED USERS
export const fetchFilteredCustomers = async (
	query: string = "",
	page: number = 1,
	limit: number = USERS_PER_PAGE,
	sortColumn: string = "created_at",
	sortDirection: "ASC" | "DESC" = "DESC",
): Promise<PaginatedResponse<TUserTable[]>> => {
	try {
		const { data, error } = await supabaseAdmin.rpc("fetch_filtered_users", {
			p_query: query,
			p_page: page,
			p_limit: limit,
			p_sort_column: sortColumn,
			p_sort_direction: sortDirection,
		});

		if (error) {
			console.error("ERROR FETCHING FILTERED USERS:", error.message);
			return { status: "error", message: error.message, data: null };
		}

		const users = data as TUserTable[];
		const totalCount = users.length > 0 ? Number(users[0].total_count) : 0;
		const totalPages = Math.ceil(totalCount / limit);
		return {
			status: "success",
			message: "FILTERED USERS FETCHED SUCCESSFULLY",
			data: users,
			currentPage: page,
			totalPages: totalPages,
		};
	} catch (error) {
		console.error(`ERROR FETCHING FILTERED USERS: ${(error as Error).message}`);
		return { status: "error", message: (error as Error).message, data: null };
	}
};

// FETCH A USER BY EMAIL.
export const fetchCustomerByEmail = async (
	email: string,
): Promise<UserResponse<TUser>> => {
	try {
		const { data, error } = await supabaseAdmin
			.rpc("fetch_user_by_email", {
				p_email: email,
			})
			.maybeSingle();

		if (error) {
			console.error("ERROR WITH SUPABASE ADMIN:", error.message);
			return { status: "error", message: error.message, data: null };
		}

		if (data) {
			return { status: "success", message: "USER FOUND", data: data as TUser };
		} else {
			return { status: "error", message: "USER NOT FOUND", data: null };
		}
	} catch (error) {
		console.error("ERROR FETCHING USER BY EMAIL:", (error as Error).message);
		return { status: "error", message: (error as Error).message, data: null };
	}
};

interface IMetaData {
	first_name?: string;
	surname?: string;
	mobile_number?: string;
	date_of_birth?: string;
}
interface IUpdatedUser {
	email?: string;
	data?: IMetaData;
}
// UPDATE THE USER INFO
export const updateCustomerInfo = async (formData: FormData) => {
	const supabase = await createSupabaseServerClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();
	if (userError || !user) {
		console.error("ERROR GETTING USER:", userError?.message);
		return {
			status: "error",
			message: userError?.message || "FAILED TO AUTHENTICATE USER",
		};
	}

	const updatedFields: { [key: string]: string } = {};
	const metadataFields: { [key: string]: string } = {};

	// CHECK WHICH FIELDS HAVE CHANGED.
	for (const [key, value] of formData.entries()) {
		const strValue = value as string;
		if (key === "email" && user.email !== strValue) {
			updatedFields.email = strValue;
		} else if (
			["first_name", "surname", "mobile_number", "date_of_birth"].includes(key)
		) {
			if (strValue !== user.user_metadata[key]) {
				metadataFields[key] = strValue;
			}
		}
	}

	// ONLY UPDATE IF THERE ARE CHANGES.
	if (
		Object.keys(updatedFields).length === 0 &&
		Object.keys(metadataFields).length === 0
	) {
		return { status: "success", message: "No Changes detected!" };
	}

	try {
		const updatedData: IUpdatedUser = {};
		if (Object.keys(updatedFields).length > 0) {
			updatedData.email = updatedFields.email;
		}
		if (Object.keys(metadataFields).length > 0) {
			updatedData.data = metadataFields;
		}

		// UPDATE THE USER INFO AND METADATA.
		const { error: updateError } = await supabase.auth.updateUser(updatedData);

		if (updateError) {
			console.error("ERROR UPDATING USER INFO:", updateError.message);
			if (
				updateError.message.includes("cannot be used as it is not authorized")
			) {
				return {
					status: "error",
					message:
						"This email domain is not authorized. Please use an authorized email domain or contact the administrator.",
				};
			}
			return { status: "error", message: updateError.message };
		}

		// IF THE EMAIL WAS UPDATED,THEN LOGOUT.
		if (updatedFields.email) {
			await logout();
		} else {
			revalidatePath("/dashboard/profile");
		}

		return {
			status: "success",
			message: updatedFields.email
				? [
						"User Info Updated!",
						"Please check your email for confirmation links.",
				  ]
				: "User Info Updated!",
		};
	} catch (error) {
		console.error("ERROR UPDATING USER INFO:", (error as Error).message);
		return { status: "error", message: (error as Error).message };
	}
};

// CHANGE THE THE PASSWORD OF THE USER
export const changePassword = async (newPassword: string) => {
	try {
		const supabase = await createSupabaseServerClient();

		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();
		if (userError || !user) {
			console.error("ERROR GETTING USER:", userError?.message);
			return {
				status: "error",
				message: userError?.message || "FAILED TO AUTHENTICATE USER",
			};
		}

		const { error: changeError } = await supabase.auth.updateUser({
			password: newPassword,
		});

		if (changeError) {
			console.error("ERROR UPDATING PASSWORD:", changeError.message);
			return { status: "error", message: changeError.message };
		} else {
			await logout();
			return { status: "success", message: "You have changed your password!" };
		}
	} catch (error) {
		console.error("ERROR UPDATING PASSWORD:", (error as Error).message);
		return { status: "error", message: (error as Error).message };
	}
};
