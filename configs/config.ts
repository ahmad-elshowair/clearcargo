const configs = {
	supabaseUrl: String(process.env.NEXT_PUBLIC_SUPABASE_URL),
	supabaseAnonKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
	supabaseServiceRoleKey: String(process.env.SUPABASE_SERVICE_ROLE_KEY),
	nodeEnv: String(process.env.NODE_ENV),
};
export default configs;
