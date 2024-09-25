import { register } from "@/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuthResult } from "@/types/auth";

export const createCustomer = async (
	formData: FormData,
): Promise<AuthResult> => {
	const supabase = await createSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user?.user_metadata.type !== "admin") {
		return {
			status: "error",
			message: "Unauthorized: Only admins can create customers",
		};
	}

	const type = formData.get("type") as string;
	return register(formData, type);
};
