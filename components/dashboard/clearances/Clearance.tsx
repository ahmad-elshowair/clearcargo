"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { MdOutlinePaid, MdPaid } from "react-icons/md";

const Clearance = ({
	id,
	first_name,
	surname,
	is_vat_paid,
	arrival_date,
	invoice,
	vat_receipt,
	loading_bill,
	email,
	port_name,
}: {
	id: string;
	first_name: string;
	surname: string;
	is_vat_paid: boolean;
	arrival_date: string;
	invoice: string;
	vat_receipt: string;
	loading_bill: string;
	email: string;
	port_name: string;
}) => {
	const pathname = usePathname();
	return (
		<section className="mb-2 w-full rounded-md bg-white p-4">
			<section className="flex items-center justify-between border-b pb-4">
				{pathname === "/dashboard/all-clearances" && (
					<div className="flex items-center gap-2">
						<Image
							src={
								"https://dwxqnygcejwrtodsggza.supabase.co/storage/v1/object/public/ClearCargo/images/avatar.png"
							}
							height={38}
							width={38}
							className="rounded-lg"
							alt="profile picture"
						/>
						<div className="flex flex-col">
							<h2 className="text-lg font-bold">{`${first_name} ${surname}`}</h2>
							<span className="text-xs text-gray-500">{email}</span>
						</div>
					</div>
				)}
				<div
					className={clsx(
						"flex items-center justify-between",
						pathname === "/dashboard/all-clearances" ? "w-6/12" : "w-full",
					)}>
					<div className="flex flex-col items-center">
						<span className="text-xs text-gray-500">VAT Paid</span>
						{is_vat_paid ? (
							<div className="flex gap-2 text-green-500">
								<span>YES</span>
								<MdPaid className="h-6 w-6" />
							</div>
						) : (
							<div className="flex gap-2 text-red-400">
								<span>NO</span>
								<MdOutlinePaid className="w-6 h-6" />
							</div>
						)}
					</div>
					<div className="flex flex-col items-center">
						<span className="text-xs text-gray-500">VAT Receipt</span>

						{vat_receipt ? (
							<Link
								href={vat_receipt}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:text-blue-700">
								View Receipt
							</Link>
						) : (
							"N/A"
						)}
					</div>
					<div className="flex flex-col items-center">
						<span className="text-xs text-gray-500">Loading Bill</span>
						{loading_bill ? (
							<Link
								href={loading_bill}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:text-blue-700">
								View Bill
							</Link>
						) : (
							"N/A"
						)}
					</div>
				</div>
			</section>
			<section className="flex w-full items-center justify-between pt-4">
				<div className="w-2/3 flex justify-between items-center">
					<div className="flex flex-col items-center">
						<span className="text-xs text-gray-500">Arrival Port</span>
						<p className="text-xl font-medium">{port_name}</p>
					</div>
					<div className="flex flex-col items-center">
						<span className="text-xs text-gray-500">Invoice</span>
						{invoice ? (
							<Link
								href={invoice}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:text-blue-700">
								View Invoice
							</Link>
						) : (
							"N/A"
						)}
					</div>

					<div className="flex flex-col items-center">
						<span className="text-xs text-gray-500">Arrival Date</span>
						<span>{arrival_date.toString().slice(0, 10)}</span>
					</div>
				</div>

				<div className="flex justify-end gap-2 w-1/3">
					{pathname === "/dashboard/all-clearances" && (
						<Link href={`/dashboard/${id}/edit`}>
							<Button className="bg-green-500 hover:bg-green-700 text-white font-bold">
								<FaPencil />
							</Button>
						</Link>
					)}
					<Button className="bg-red-500 hover:bg-red-700 text-white font-bold">
						<FaTrashCan />
					</Button>
				</div>
			</section>
		</section>
	);
};

export default Clearance;
