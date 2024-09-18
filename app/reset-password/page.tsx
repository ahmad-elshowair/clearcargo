import { Logo } from "@/components/Logo";
import ResetPasswordForm from "@/components/ResetPasswordForm";

const ResetPasswordPage = () => {
	return (
		<section className="lg:min-h-screen xl:min-h-screen h-screen p-4 w-full">
			<section className="rounded-lg bg-gray-300/35 shadow h-full p-10 border border-green-400/50">
				<section className="justify-self-start">
					<Logo fontSize="text-[45px]" />
				</section>
				<section className="flex items-center justify-center h-[calc(100%-200px)]">
					<section className="flex flex-col justify-center px-5 py-10 bg-green-500 w-1/3 rounded-md">
						<h1 className="text-3xl font-bold text-gray-300/35 mb-10 text-center">
							Reset Password
						</h1>
						<ResetPasswordForm />
					</section>
				</section>
			</section>
		</section>
	);
};

export default ResetPasswordPage;
