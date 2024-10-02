const configs = {
	supabaseUrl: String(process.env.NEXT_PUBLIC_SUPABASE_URL),
	supabaseAnonKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
	supabaseServiceRoleKey: String(process.env.SUPABASE_SERVICE_ROLE_KEY),
	nodeEnv: String(process.env.NODE_ENV),
	frontendUrl: String(process.env.NEXT_PUBLIC_FRONT_END_URL),
	smtpHost: String(process.env.SMTP_HOST),
	smtpPort: Number(process.env.SMTP_PORT),
	smtpUser: String(process.env.SMTP_USER),
	smtpPass: String(process.env.SMTP_PASS),
	senderEmail: String(process.env.SENDER_EMAIL),
	senderName: String(process.env.SENDER_NAME),
};
export default configs;
