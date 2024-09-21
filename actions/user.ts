"use server";
import { createAdminClient } from "@/lib/supabase/admin";
import { User } from "@supabase/supabase-js";
const supabaseAdmin = createAdminClient();

// FETCH ALL USERS
export const fetchAllUser = async () => {
	try {
		let users: User[] = [];
		let page: number | undefined = undefined;

		do {
			const { data, error } = await supabaseAdmin.auth.admin.listUsers({
				page,
			});
			if (error) {
				console.error(`SUPABASE FETCHING ALL USERS: ${error.message}`);
				return {
					status: "error",
					message: error.message,
					data: null,
				};
			}

			if (data && data.users) {
				users = users.concat(data.users);
				page = data.nextPage ?? undefined;
			} else {
				page = undefined;
			}
		} while (page);
		return {
			status: "success",
			message: "USERS FETCHED SUCCESSFULLY",
			data: users,
		};
	} catch (error) {
		console.error(`ERROR FETCHING ALL USERS: ${(error as Error).message}`);
		return {
			status: "error",
			message: (error as Error).message,
			data: null,
		};
	}
};

// FETCH A USER BY EMAIL.

export const getUserByEmail = async (email: string) => {
	try {
		const { data, error } = await supabaseAdmin
			.rpc("get_user_by_email", {
				p_email: email,
			})
			.maybeSingle();

		if (error) {
			console.error("ERROR WITH SUPABASE ADMIN:", error.message);
			return { status: "error", message: error.message, data: null };
		}

		if (data) {
			console.log("the user: ", data);
			return { status: "success", message: "USER FOUND", data: data };
		} else {
			return { status: "error", message: "USER NOT FOUND", data: null };
		}
	} catch (error) {
		console.error("ERROR FETCHING USER BY EMAIL: ", (error as Error).message);
		return { status: "error", message: (error as Error).message, data: null };
	}
};
