"use server";
import { createAdminClient } from "@/lib/supabase/admin";

export const getUserByEmail = async (email: string) => {
	const supabaseAdmin = createAdminClient();

	// Fetch all users and manually filter by email
	const { data, error } = await supabaseAdmin.auth.admin.listUsers();

	if (error) {
		return { status: "error", message: error.message, data: null };
	}

	// Manually filter the users array to find the user with the matching email
	const user = data.users.find((user) => user.email === email);

	console.log("the user: ", user);

	if (user) {
		return { status: "success", message: "Found user", data: user };
	}

	return { status: "error", message: "User not found", data: null };
};
