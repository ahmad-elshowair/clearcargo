"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuthResult } from "@/types/auth";
import { getUserByEmail } from "./user";

export const login = async (formDate: FormData): Promise<AuthResult> => {
	const supabase = await createSupabaseServerClient();

	const data = {
		email: formDate.get("email") as string,
		password: formDate.get("password") as string,
	};

	const user = await getUserByEmail(data.email);
	if (user.status === "error" && user.message === "User not found") {
		return { status: "error", message: "User not found" };
	}

	const { error: errorLogin } = await supabase.auth.signInWithPassword(data);
	if (errorLogin) {
		console.error("Login error:", errorLogin.message);
		return { status: "error", message: errorLogin.message };
	}

	return { status: "success", message: "Logged in successfully" };
};

export const register = async (formDate: FormData): Promise<AuthResult> => {
	const supabase = await createSupabaseServerClient();

	const data = {
		email: formDate.get("email") as string,
		password: formDate.get("password") as string,
		date_of_birth: formDate.get("date_of_birth") as string,
		mobile_number: formDate.get("mobile_number") as string,
		first_name: formDate.get("first_name") as string,
		surname: formDate.get("surname") as string,
	};

	const user = await getUserByEmail(data.email);

	if (user.data) {
		return { status: "error", message: "Email already exist!" };
	}

	const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			data: {
				first_name: data.first_name,
				surname: data.surname,
				date_of_birth: data.date_of_birth,
				mobile_number: data.mobile_number,
				type: "customer",
			},
		},
	});

	console.log("Sign Up Response:", signUpData);

	if (signUpError) {
		console.error("Sign Up Error:", signUpError.message);
		return { status: "error", message: signUpError.message };
	}

	return { status: "success", message: "Registered successfully" };
};

export const logout = async (): Promise<AuthResult> => {
	const supabase = await createSupabaseServerClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error("Logout error:", error.message);
		return { status: "error", message: error.message };
	}

	return { status: "success", message: "Logged out successfully" };
};

export const forgotPassword = async (
	formDate: FormData,
): Promise<AuthResult> => {
	const supabase = await createSupabaseServerClient();

	const email = formDate.get("email") as string;

	const { error } = await supabase.auth.resetPasswordForEmail(email);
	if (error) {
		return { status: "error", message: error.message };
	}

	return {
		status: "success",
		message: "Password reset email sent successfully",
	};
};
