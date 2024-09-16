import { createSupabaseServerClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);

	const token_hash = searchParams.get("token_hash");

	const type = searchParams.get("type") as EmailOtpType | null;

	const next = searchParams.get("next") ?? "/";

	if (!token_hash || !type) {
		return NextResponse.redirect(
			"/error?message=Invalid%20or%20missing%20parameters",
		);
	}
	const supabase = createSupabaseServerClient();

	try {
		const { error } = await supabase.auth.verifyOtp({ type, token_hash });

		if (error) {
			console.error("Error verifying OTP:", error);
			return NextResponse.redirect(
				`/error?message=${encodeURIComponent(error.message)}`,
			);
		}
		return NextResponse.redirect(next);
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.redirect(
			"/error?message=An%20unexpected%20error%20occurred",
		);
	}
}
