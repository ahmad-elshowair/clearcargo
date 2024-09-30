import { z } from "zod";

export const CreateClearanceSchema = z.object({
	port_id: z.string().uuid(),
	is_vat_paid: z.boolean(),
	arrival_date: z.date(),
	invoice: z.union([z.instanceof(File), z.string().url()]).nullable(),
	loading_bill: z.union([z.instanceof(File), z.string().url()]).nullable(),
	vat_receipt: z.union([z.instanceof(File), z.string().url()]).nullable(),
});

export type CreateClearanceInput = z.infer<typeof CreateClearanceSchema>;
