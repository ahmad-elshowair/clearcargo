export type TClearanceTable = {
	clearance_id: string;
	first_name: string;
	surname: string;
	arrival_date: string;
	is_vat_paid: boolean;
	vat_receipt: string;
	invoice: string;
	loading_bill: string;
	created_by: string;
	email: string;
	port_name: string;
	total_count: number;
};

export type TClearance = {
	clearance_id?: string;
	port_id: string;
	created_by?: string;
	is_vat_paid: boolean;
	arrival_date: Date | string;
	invoice?: string | null;
	loading_bill?: string | null;
	vat_receipt?: string | null;
};

export type TClearanceResult = {
	status: "error" | "success";
	message: string;
	data?: TClearance;
};
export type TFilteredClearanceResult = {
	status: "error" | "success";
	message: string;
	data?: TClearanceTable[];
	currentPage?: number;
	totalPages?: number;
};
