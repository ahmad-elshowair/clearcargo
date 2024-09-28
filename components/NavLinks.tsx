"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShippingFast } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { GiHomeGarage } from "react-icons/gi";
import { RiDashboardHorizontalFill } from "react-icons/ri";

const NavLinks = ({ type }: { type: "customer" | "admin" }) => {
	const pathname = usePathname();
	const links = [
		{ href: "/", label: "Home", icon: GiHomeGarage },
		{ href: "/dashboard", label: "Dashboard", icon: RiDashboardHorizontalFill },
		{
			href: "/dashboard/clearances",
			label: "Clearances",
			icon: FaShippingFast,
		},
		{
			href: "/dashboard/all-clearances",
			label: "All Clearances",
			icon: FaShippingFast,
		},
		{
			href: "/dashboard/customers",
			label: "Customers",
			icon: FaUsers,
		},
	];

	const filteredLinks = links.filter((link) => {
		if (!type) {
			return link.href !== "/";
		}
		if (type !== "admin" && link.href === "/dashboard/customers") {
			return false;
		}
		if (type !== "admin" && link.href === "/dashboard/all-clearances") {
			return false;
		}
		return true;
	});
	return (
		<>
			{filteredLinks.map((link) => {
				return (
					<Link
						href={link.href}
						key={link.label}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-4 rounded-md p-3 md:text-sm font-semibold md:flex-none md:justify-start md:p-2 md:px-3 shadow bg-green-100 hover:bg-[#07BE52] text-[#2A3940] hover:text-green-50 duration-300 ease-in-out",
							{ "bg-green-500 text-green-50": link.href === pathname },
						)}>
						<link.icon className="font-bold " />
						<span className="hidden lg:block">{link.label}</span>
					</Link>
				);
			})}
		</>
	);
};

export default NavLinks;
