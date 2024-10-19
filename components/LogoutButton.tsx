"use client";
import { logout } from "@/actions/auth";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "./ui/button";

const LogoutButton = () => {
	const { toast } = useToast();

	const handleLogout = async () => {
		const result = await logout();

		if (result.status === "success") {
			toast({
				title: (
					<h1 className="font-extrabold text-lg text-green-800">
						Logout Success
					</h1>
				),
				description: (
					<div className="bg-green-100 p-4 rounded-md w-[350px]">
						<p className="text-md font-bold text-green-500">{result.message}</p>
					</div>
				),
				duration: 5000,
				className: "border-none bg-green-500/80",
			});
		} else {
			console.error("Failed to log out:", result.message);

			toast({
				title: (
					<h1 className="font-extrabold text-lg text-red-800">Logout Error</h1>
				),
				description: (
					<div className="bg-red-100 p-4 rounded-md w-[350px]">
						<p className="text-md font-bold text-red-500">{result.message}</p>
					</div>
				),
				duration: 5000,
				className: "border-none bg-red-500/80",
			});
		}
	};
	return (
		<Button
			onClick={handleLogout}
			className="text-white bg-green-500 hover:bg-green-600 h-12 w-40 font-bold text-lg">
			Logout
		</Button>
	);
};

export default LogoutButton;
