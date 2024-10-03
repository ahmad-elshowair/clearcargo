import { z } from "zod";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
	"image/jpeg",
	"image/png",
	"image/jpg",
	"application/pdf",
];

const fileSchema = z
	.custom<File>((file) => file instanceof File, "Invalid file type.")
	.refine((file) => file.size <= MAX_SIZE, "File size exceeds 5MB.")
	.refine(
		(file) => ACCEPTED_TYPES.includes(file.type),
		"only .jpeg, .jpg, .png, and .pdf files are allowed.",
	);

export const CreateClearanceSchema = z
	.object({
		port_id: z.string().uuid(),
		is_vat_paid: z.boolean(),
		vat_receipt: z.union([fileSchema, z.null()]).optional(),
		arrival_date: z.date(),
		invoice: z.union([fileSchema, z.string().url(), z.null()]),
		loading_bill: z.union([fileSchema, z.string().url(), z.null()]),
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
