import configs from "@/configs/config";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	// INITIALIZE RESPONSE
	const supabaseResponse = NextResponse.next({
		request,
	});

	// INITIALIZE SUPABASE CLIENT
	const supabase = createServerClient(
		configs.supabaseUrl,
		configs.supabaseAnonKey,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, {
							httpOnly: true,
							secure: configs.nodeEnv === "production",
							sameSite: "lax",
							path: "/",
							...options,
						}),
					);
				},
			},
		},
	);

	// RETRIEVE USER FROM SUPABASE SESSION
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error) {
		console.error("Error getting user:", error.message);
	}

	const path = request.nextUrl.pathname;

	// DEFINE ROUTES SPECIFIC ROUTES.
	const ROUTES_CONFIG = {
		PUBLIC: new Set([
			"/",
			"/login",
			"/register",
			"/auth/confirm",
			"/forgot-password",
			"/reset-password",
		]),
		PROTECTED: new Set(["/dashboard", "/dashboard/clearances"]),
		ADMIN: new Set(["/dashboard/customers", "/dashboard/all-clearances"]),
	};

	// REDIRECTION FUNCTION
	const redirect = (destination: string) => {
		return NextResponse.redirect(new URL(destination, request.url));
	};

	// IF THE ROUTE IS PUBLIC, THEN ALLOW ACCESS.
	if (ROUTES_CONFIG.PUBLIC.has(path)) {
		return NextResponse.next();
	}

	// IF NO USER, THEN REDIRECT TO LOGIN PAGE.
	if (!user) {
		return redirect("/login");
	}
	// IF THE ROUTE IS ADMIN ROUTE, THEN REDIRECT TO NOT AUTHORIZED PAGE
	if (ROUTES_CONFIG.ADMIN.has(path) && user.user_metadata.type !== "admin") {
		return redirect("/not-authorized");
	}

	// IF THE PATH IS PROTECTED, THEN ALLOW ACCESS IF LOGGED IN.
	if (ROUTES_CONFIG.PROTECTED.has(path)) {
		return NextResponse.next();
	}

	// RETURN THE MODIFIED RESPONSE
	return supabaseResponse;
}
