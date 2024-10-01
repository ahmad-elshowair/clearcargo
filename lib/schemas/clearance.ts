import { z } from "zod";

export const CreateClearanceSchema = z
	.object({
		port_id: z.string().uuid(),
		is_vat_paid: z.boolean(),
		vat_receipt: z.any().nullable().optional(),
		arrival_date: z.date(),
		invoice: z.union([z.instanceof(File), z.string().url()]).nullable(),
		loading_bill: z.union([z.instanceof(File), z.string().url()]).nullable(),
	})
	.refine(
		(data) => {
			if (data.is_vat_paid) {
				return data.vat_receipt instanceof File;
			}
			return true;
		},
		{
			path: ["vat_receipt"],
			message: "VAT Receipt is required when VAT is paid.",
		},
	);

export type CreateClearanceInput = z.infer<typeof CreateClearanceSchema>;
