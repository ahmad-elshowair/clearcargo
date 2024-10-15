"use client";
import { logout } from "@/actions/auth";
import { UserType } from "@/types/user";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { FaAddressCard, FaArrowRightFromBracket } from "react-icons/fa6";
import { useToast } from "./hooks/use-toast";

interface AuthLinksProps {
	userType: UserType;
	first_name: string;
}
const AuthLinks: FC<AuthLinksProps> = ({ userType, first_name }) => {
	const router = useRouter();
	const pathname = usePathname();
	const { toast } = useToast();
	const handleLogout = async () => {
		try {
			const result = await logout();
			if (result.status === "success") {
				toast({
					title: "Logout",
					description: (
						<div className="bg-green-100 p-2 w-[350px]">
							<p className="text-green-500 text-sm">{result.message}</p>
						</div>
					),
					duration: 5000,
				});
				router.push("/login");
			} else {
				toast({
					title: "Logout",
					description: (
						<div className="bg-red-100 p-2 w-[350px]">
							<p className="text-red-500 text-sm">{result.message}</p>
						</div>
					),
					duration: 5000,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			{userType === "customer" && (
				<Link
					href="/dashboard/profile"
					className={clsx(
						"flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none lg:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-[#2A3940] bg-emerald-100 hover:text-green-50  duration-200 ease-in-out",
						{
							"bg-green-500 text-orange-50": pathname === "/dashboard/profile",
						},
					)}>
					<FaAddressCard className="w-6" />
					<span className="hidden sm:block">{first_name}</span>
				</Link>
			)}
			<button
				onClick={handleLogout}
				className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none lg:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-[#2A3940] bg-emerald-100 hover:text-green-50 duration-200 ease-in-out">
				<FaArrowRightFromBracket className="w-6" />
				<span className="hidden sm:block">logout</span>
			</button>
		</>
	);
};

export default AuthLinks;
