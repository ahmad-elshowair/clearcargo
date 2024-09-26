"use server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
	PaginatedResponse,
	TUser,
	TUserTable,
	UserResponse,
} from "@/types/user";

const USERS_PER_PAGE = 5;

const supabaseAdmin = createAdminClient();

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
			console.log("USER FOUND:", data);
			return { status: "success", message: "USER FOUND", data: data as TUser };
		} else {
			return { status: "error", message: "USER NOT FOUND", data: null };
		}
	} catch (error) {
		console.error("ERROR FETCHING USER BY EMAIL:", (error as Error).message);
		return { status: "error", message: (error as Error).message, data: null };
	}
};
