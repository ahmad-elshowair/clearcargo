"use client";
import DeleteModal from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import { TClearanceTable } from "@/types/clearance";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPencil } from "react-icons/fa6";
import { MdOutlinePaid, MdPaid } from "react-icons/md";

const Clearance = ({
	clearance,
	link,
}: {
	clearance: TClearanceTable;
	link: string;
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
							<h2 className="text-lg font-bold">{`${clearance.first_name} ${clearance.surname}`}</h2>
							<span className="text-xs text-gray-500">{clearance.email}</span>
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
						{clearance.is_vat_paid ? (
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

						{clearance.vat_receipt ? (
							<Link
								href={clearance.vat_receipt}
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
						{clearance.loading_bill ? (
							<Link
								href={clearance.loading_bill}
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
						<p className="text-xl font-medium">{clearance.port_name}</p>
					</div>
					<div className="flex flex-col items-center">
						<span className="text-xs text-gray-500">Invoice</span>
						{clearance.invoice ? (
							<Link
								href={clearance.invoice}
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
						<span>{clearance.arrival_date.toString().slice(0, 10)}</span>
					</div>
				</div>

				<div className="flex justify-end gap-2 w-1/3">
					{pathname === "/dashboard/all-clearances" && (
						<Link href={`/dashboard/${clearance.clearance_id}/edit`}>
							<Button className="bg-green-500 hover:bg-green-700 text-white font-bold">
								<FaPencil />
							</Button>
						</Link>
					)}
					<DeleteModal
						id={clearance.clearance_id}
						label="Clearance"
						link={link}
					/>
				</div>
			</section>
		</section>
	);
};

export default Clearance;
