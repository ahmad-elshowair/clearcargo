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

// UPDATE THE USER INFO
export async function updateCustomerInfo(formData: FormData) {
	
	const supabase = await createSupabaseServerClient();
 
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();
	if (userError || !user) {
		console.error("ERROR GETTING USER:", userError?.message);
		return { status: "error", message: userError?.message };
	}

	const customerInfo = {
		email: formData.get("email") as string,
		first_name: formData.get("first_name") as string,
		surname: formData.get("surname") as string,
		mobile_number: formData.get("mobile_number") as string,
		date_of_birth: formData.get("date_of_birth") as string,
	};
	try {
		// UPDATE THE USER INFO AND METADATA.
		const { data, error: updateError } = await supabase.auth.updateUser({
			email: customerInfo.email,
			data: {
				first_name: customerInfo.first_name,
				surname: customerInfo.surname,
				mobile_number: customerInfo.mobile_number,
				date_of_birth: new Date(customerInfo.date_of_birth).toISOString(),
			},
		});

		if (updateError) {
			console.error("ERROR UPDATING USER INFO:", updateError.message);
			return { status: "error", message: updateError.message };
		}

		console.log("User updated successfully:", data); // Debug log
		revalidatePath("/dashboard/profile");
		return { status: "success", message: "USER INFO UPDATED SUCCESSFULLY" };
	} catch (error) {
		console.error("ERROR UPDATING USER INFO:", (error as Error).message);
		return { status: "error", message: (error as Error).message };
	}
}
