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
				title: "LOGOUT SUCCESS",
				description: (
					<div className="bg-green-100 p-4 rounded-md w-[350px] shadow shadow-green-500/50">
						<p className="text-md font-bold text-green-500">{result.message}</p>
					</div>
				),
				duration: 5000,
				className:
					"border-none bg-green-500/80 text-lg text-white font-extrabold",
			});
		} else {
			console.error("Failed to log out:", result.message);
			toast({
				title: "LOGOUT ERROR",
				description: (
					<div className="bg-red-100 p-4 rounded-md w-[360px] shadow shadow-red-500/50">
						<p className="text-md font-bold text-red-500">{result.message}</p>
					</div>
				),
				duration: 5000,
				className:
					"border-none bg-red-500/80 font-extrabold text-lg text-white",
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
