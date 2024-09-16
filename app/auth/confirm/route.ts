import { createSupabaseServerClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);

	const token_hash = searchParams.get("token_hash");

	const type = searchParams.get("type") as EmailOtpType | null;

	const next = searchParams.get("next") ?? "/";

	// If token_hash or type is missing, redirect to error page with absolute URL

	if (!token_hash || !type) {
		const errorUrl = new URL("/error", request.url);
		errorUrl.searchParams.set("message", "Invalid or missing parameters");
		return NextResponse.redirect(errorUrl.toString());
	}
	const supabase = await createSupabaseServerClient();

	try {
		const { error } = await supabase.auth.verifyOtp({ type, token_hash });

		if (error) {
			console.error("Error verifying OTP:", error);
			const errorUrl = new URL("/error", request.url);
			errorUrl.searchParams.set("message", error.message);
			return NextResponse.redirect(errorUrl.toString());
		}
		// Redirect to the next page after successful verification
		const nextUrl = new URL(next, request.url);
		return NextResponse.redirect(nextUrl.toString());
	} catch (error) {
		console.error("Unexpected error:", error);
		console.error("Unexpected error:", error);
		const errorUrl = new URL("/error", request.url);
		errorUrl.searchParams.set("message", "An unexpected error occurred");
		return NextResponse.redirect(errorUrl.toString());
	}
}
