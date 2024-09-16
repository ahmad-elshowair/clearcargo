import { createAdminClient } from "@/lib/supabase/admin";

export const getUserByEmail = async (email: string) => {
	const supabaseAdmin = createAdminClient();

	const { data: user, error } = await supabaseAdmin

		.from("auth.users")
		.select("*")
		.eq("email", email)
		.single();

	if (error) {
		return { status: "error", message: error.message, data: null };
	}

	if (user) {
		return { status: "success", message: "Found user", data: user };
	}
	return { status: "error", message: "User not found", data: null };
};
