"use server";

import { createClient } from "@/lib/supabase/server";

export const login = async (formDate: FormData) => {
	const supabase = createClient();

	const data = {
		email: formDate.get("email") as string,
		password: formDate.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);
	if (error) {
		return { status: error, message: error.message };
	}

	return { status: "success", message: "Logged in successfully" };
};

export const register = async (formDate: FormData) => {
	const supabase = createClient();

	const data = {
		email: formDate.get("email") as string,
		password: formDate.get("password") as string,
		date_of_birth: formDate.get("date_of_birth") as string,
		mobile_number: formDate.get("mobile_number") as string,
		first_name: formDate.get("first_name") as string,
		surname: formDate.get("surname") as string,
	};

	const { error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
	});

	if (error) {
		console.error(error.message);
		return { status: "error", message: error.message };
	}

	const { error: insertError } = await supabase.from("customers").insert([
		{
			id: (await supabase.auth.getUser()).data.user?.id,
			email: data.email,
			password: data.password,
			first_name: data.first_name,
			surname: data.surname,
			date_of_birth: data.date_of_birth,
			mobile_number: data.mobile_number,
		},
	]);

	if (insertError) {
		console.error(insertError.message);
		return { status: "error", message: insertError.message };
	}

	return { status: "success", message: "Registered successfully" };
};
