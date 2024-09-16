"use client";
import { logout } from "@/actions/auth";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const LogoutButton = () => {
	const router = useRouter();
	const { toast } = useToast();

	const handleLogout = async () => {
		console.log("Logout button clicked!");

		const result = await logout();

		if (result.status === "success") {
			toast({
				title: "Logout",
				description: result.message,
			});
			router.refresh(); // Refresh the page to update the UI
		} else {
			toast({
				title: "Logout",
				description: result.message,
				variant: "destructive",
			});
			console.error("Failed to log out:", result.message);
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
