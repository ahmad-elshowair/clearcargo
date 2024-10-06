import DeleteModal from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import { TUserTable } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

const Customer = ({ customer }: { customer: TUserTable }) => {
	return (
		<section className="mb-2 w-full rounded-md bg-white p-4">
			<section className="flex items-center justify-between border-b pb-4">
				<div>
					<div className="mb-2 flex items-center">
						<Image
							src={
								"https://dwxqnygcejwrtodsggza.supabase.co/storage/v1/object/public/ClearCargo/images/avatar.png"
							}
							height={28}
							width={28}
							className="rounded-full mr-2"
							alt="profile picture"
						/>
						<h2 className="text-lg font-bold">{`${customer.first_name} ${customer.surname}`}</h2>
					</div>
					<span>{customer.email}</span>
				</div>
				<span className="text-sm">
					{customer.created_at.toString().slice(0, 10)}
				</span>
			</section>
			<section className="flex w-full items-center justify-between pt-4">
				<div>
					<p className="text-xl font-medium">{customer.user_type}</p>
				</div>
				<div className="flex justify-end gap-2">
					<Link href={`/dashboard/customers/${customer.id}/edit`}>
						<Button className="bg-transparent text-green-600 hover:text-green-50 hover:bg-green-600 px-2 border border-green-600 h-fit">
							<FaPencil className="w-5" />
						</Button>
					</Link>
					<DeleteModal id={customer.id} label="Customer" />
				</div>
			</section>
		</section>
	);
};

export default Customer;
