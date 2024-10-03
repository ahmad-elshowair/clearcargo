export type TAdmin = {
	email: string;
	user_metadata: {
		type: string;
		surname: string;
		first_name: string;
		date_of_birth: string;
		mobile_number: string;
	};
};


export type TAdminResult ={
	status: "success" | "error";
	message: string;
	data?: TAdmin;
} 