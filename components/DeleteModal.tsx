"use client";
import { deleteCustomer } from "@/actions/admin";
import { deleteClearance } from "@/actions/clearance";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useToast } from "./hooks/use-toast";

const DeleteModal = ({
	label,
	id,
	link,
}: {
	label: string;
	id: string;
	link?: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDeleting, startTransition] = useTransition();
	const pathname = usePathname();
	const { toast } = useToast();

	const handleDelete = async () => {
		if (!id) {
			console.error("No ID provided for delete");
			toast({
				title: "Deleting Clearance",
				description: "No ID provided for delete",
				variant: "destructive",
				duration: 3000,
			});
			return;
		}
		startTransition(async () => {
			if (
				pathname === "/dashboard/clearances" ||
				pathname === "/dashboard/all-clearances"
			) {
				const deleteResult = await deleteClearance(id, link);
				if (deleteResult.status === "error") {
					console.error("ERROR DELETING CLEARANCE", deleteResult.message);
					toast({
						title: "Deleting Clearance",
						description: (
							<div className="flex justify-center items-center bg-red-500 text-red-50 p-4 rounded-md w-[350px]">
								<p className="text-md font-bold">{deleteResult.message}</p>
							</div>
						),
						duration: 3000,
					});
				} else {
					toast({
						title: "Deleting Clearance",
						description: (
							<div className="flex justify-center items-center bg-green-500 text-green-50 p-4 rounded-md w-[350px]">
								<p className="text-md font-bold">{deleteResult.message}</p>
							</div>
						),
						duration: 3000,
					});
					setIsOpen(false);
				}
			}
			if (pathname === "/dashboard/customers") {
				const deleteResult = await deleteCustomer(id);
				if (deleteResult.status === "error") {
					console.error("ERROR DELETING CUSTOMER", deleteResult.message);
					toast({
						title: "Deleting Customer",
						description: (
							<div className="flex justify-center items-center bg-red-500 text-red-50 p-4 rounded-md w-[350px]">
								<p className="text-md font-bold">{deleteResult.message}</p>
							</div>
						),
						duration: 3000,
					});
				} else {
					toast({
						title: "Deleting Customer",
						description: (
							<div className="flex justify-center items-center bg-green-500 text-green-50 p-4 rounded-md w-[350px]">
								<p className="text-md font-bold">{deleteResult.message}</p>
							</div>
						),
						duration: 3000,
					});
					setIsOpen(false);
				}
			}
		});
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="bg-transparent px-2 border border-red-600 hover:bg-red-600 hover:text-red-50 text-red-600 h-fit">
					<span className="sr-only">Delete</span>
					<FaTrashCan className="w-5" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm-:max-w-[425px] bg-green-200">
				<DialogHeader className="mb-4">
					<DialogTitle className="text-green-900">Delete {label}</DialogTitle>
				</DialogHeader>
				<DialogDescription className="text-green-800 mb-4">
					Are you sure you want to delete this {label}?
				</DialogDescription>
				<DialogFooter>
					<DialogClose className="flex justify-end gap-4">
						<Button className="border border-emerald-50 bg-emerald-50 text-green-700 hover:bg-green-500 hover:text-green-50 h-fit hover:border-green-500">
							Close
						</Button>

						<Button
							className="bg-red-200 text-red-700 hover:bg-red-500 hover:text-red-50 h-fit"
							type="submit"
							disabled={isDeleting}
							onClick={handleDelete}>
							{isDeleting ? "Deleting..." : "Delete"}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteModal;
