import { hashPassword } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const login = async (formDate: FormData) => {
	const supabase = createClient();

	const data = {
		email: formDate.get("email") as string,
		password: formDate.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);
	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
};

export const register = async (formDate: FormData) => {
	const supabase = createClient();

	const data = {
		email: formDate.get("email") as string,
		password: formDate.get("password") as string,
		date_of_birth: formDate.get("date_of_birth"),
		mobile_number: formDate.get("mobile_number"),
		first_name: formDate.get("first_name"),
		surname: formDate.get("surname"),
	};

	const hashedPassword = hashPassword(data.password);

	const { error } = await supabase.auth.signUp({
		email: data.email,
		password: hashedPassword,
	});

	if (error) {
		redirect("/error");
	}

	const { error: insertError } = await supabase.from("users").insert([
		{
			email: data.email,
			password: hashedPassword,
			first_name: data.first_name,
			surname: data.surname,
			date_of_birth: data.date_of_birth,
			mobile_number: data.mobile_number,
		},
	]);

	if (insertError) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
};
