"use server";

import configs from "@/configs/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isOver18 } from "@/lib/utils";
import { AuthResult } from "@/types/auth";
import { getUserByEmail } from "./user";

export const login = async (formDate: FormData): Promise<AuthResult> => {
	const supabase = await createSupabaseServerClient();

	const data = {
		email: formDate.get("email") as string,
		password: formDate.get("password") as string,
	};

	const user = await getUserByEmail(data.email);

	// HANDLE USER NOT FOUND
	if (user.status === "error" && user.message === "User not found") {
		return { status: "error", message: "User not found" };
	} else if (user.status === "error") {
		// HANDLE UNEXPECTED ERRORS FROM getUserByEmail
		console.error("Error fetching user:", user.message);
		return { status: "error", message: user.message };
	}

	const { error: errorLogin } = await supabase.auth.signInWithPassword(data);
	if (errorLogin) {
		if (errorLogin.status === 400) {
			return { status: "error", message: "Incorrect password" };
		}
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

	// CHECK IF THE USER IS NOT OVER 18 YEARS.
	if (!isOver18(data.date_of_birth)) {
		return {
			status: "error",
			message: "You must be over 18 years old to register",
		};
	}

	const user = await getUserByEmail(data.email);

	// HANDLE EXISTING USER
	if (user.status === "success") {
		return { status: "error", message: "Email already exists!" };
	} else if (user.status === "error" && user.message !== "User not found") {
		// HANDLE UNEXPECTED ERRORS
		console.error("Error checking existing user:", user.message);
		return { status: "error", message: "Error checking existing user" };
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

	const user = await getUserByEmail(email);

	// HANDLE USER NOT FOUND
	if (user.status === "error" && user.message === "User not found") {
		return { status: "error", message: user.message };
	} else if (user.status === "error") {
		//HANDLE UNEXPECTED ERRORS FROM getUserByEmail
		console.error("ERROR FETCHING USER: ", user.message);
		return { status: "error", message: user.message };
	}

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${configs.frontendUrl}reset-password`,
	});

	if (error) {
		return { status: "error", message: error.message };
	}
	return {
		status: "success",
		message: "PASSWORD RESET EMAIL SENT SUCCESSFULLY",
	};
};

export const resetPassword = async (formData: FormData) => {
	const supabase = await createSupabaseServerClient();

	const new_password = formData.get("new_password") as string;
	const code = formData.get("code") as string;

	if (!code) {
		return { status: "error", message: "MISSING CODE!" };
	}

	try {
		const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
			code,
		);

		if (exchangeError) {
			console.error("Error verifying recovery code:", exchangeError.message);
			return { status: "error", message: exchangeError.message };
		}

		const { error: updateError } = await supabase.auth.updateUser({
			password: new_password,
		});

		if (updateError) {
			console.error("Error updating password:", updateError.message);
			return { status: "error", message: updateError.message };
		}

		return { status: "success", message: "PASSWORD UPDATED SUCCESSFULLY" };
	} catch (error) {
		console.error("ERROR RESETTING PASSWORD:", error);
		return { status: "error", message: (error as Error).message };
	}
};
