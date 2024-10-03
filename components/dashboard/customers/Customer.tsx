import DeleteModal from "@/components/DeleteModal";
import { TUserTable } from "@/types/user";
import Image from "next/image";
import { FaPencil } from "react-icons/fa6";

const Customer = ({ customer }: { customer: TUserTable }) => {
	return (
		<section className="mb-2 w-full rounded-md bg-white p-4">
			<section className="flex items-center justify-between border-b pb-4">
				<div>
					<div className="mb-2 flex items-center">
						<Image
							src={
								"https://dwxqnygcejwrtodsggza.supabase.co/storage/v1/object/public/ClreaCargo/images/29-8-2024-367-avatar.png"
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
				<span>{customer.created_at.toString().slice(0, 10)}</span>
			</section>
			<section className="flex w-full items-center justify-between pt-4">
				<div>
					<p className="text-xl font-medium">{customer.user_type}</p>
				</div>
				<div className="flex justify-end gap-2">
					<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
						<FaPencil />
					</button>
					<DeleteModal id={customer.id} label="Customer" />
				</div>
			</section>
		</section>
	);
};

export default Customer;
