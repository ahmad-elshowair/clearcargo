export type UserResponse<T> = {
	status: "success" | "error";
	message: string;
	data: T | null;
};

export type PaginatedResponse<T> = UserResponse<T> & {
	totalCount?: number;
	currentPage?: number;
	totalPages?: number;
};

export type TUserTable = {
	id: string;
	email: string;
	first_name: string;
	surname: string;
	user_type: string;
	date_of_birth: string;
	mobile_number: string;
	created_at: string;
	updated_at: string;
	total_count: number;
};

export type TUser = {
	id: string;
	email: string;
	first_name: string | null;
	surname: string | null;
	user_type: string | null;
	date_of_birth: string | null;
	mobile_number: string | null;
	created_at: string;
	updated_at: string;
};

export type UserType = "admin" | "customer";
