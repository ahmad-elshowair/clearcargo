import Image from "next/image";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

const Customer = ({
	first_name,
	surname,
	created_at,
	type,
	email,
}: {
	first_name: string;
	surname: string;
	type: string;
	created_at: string;
	email: string;
}) => {
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
						<h2 className="text-lg font-bold">{`${first_name} ${surname}`}</h2>
					</div>
					<span>{email}</span>
				</div>
				<span>{created_at.toString().slice(0, 10)}</span>
			</section>
			<section className="flex w-full items-center justify-between pt-4">
				<div>
					<p className="text-xl font-medium">{type}</p>
				</div>
				<div className="flex justify-end gap-2">
					<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
						<FaPencil />
					</button>
					<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
						<FaTrashCan />
					</button>
				</div>
			</section>
		</section>
	);
};

export default Customer;
