import configs from "@/configs/config";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request: { headers: request.headers },
	});

	const supabase = createServerClient(
		configs.supabaseUrl,
		configs.supabaseAnonKey,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	const publicRoutes = [
		"/login",
		"/register",
		"/forgot-password",
		"/reset-password",
		"/auth",
	];

	try {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();
		if (error) throw new Error(error.message);

		if (
			!user &&
			!publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
		) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	} catch (err) {
		console.error("Error fetching user: ", err);
		return NextResponse.error();
	}
	return supabaseResponse;
}
