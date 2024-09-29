import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/jpg",
	"application/pdf",
];

const fileSchema = z
	.instanceof(File)
	.refine(
		(file) => file.size <= MAX_FILE_SIZE,
		`File size should be less than 5MB.`,
	)
	.refine(
		(file) => ACCEPTED_FILE_TYPES.includes(file.type),
		"Only .jpg, .jpeg, .png and .pdf formats are supported.",
	);

export const CreateClearanceSchema = z.object({
	port_id: z.string({ invalid_type_error: "Please choose a port!" }),
	is_vat_paid: z.boolean({
		invalid_type_error: "Please select if VAT is paid!",
	}),
	vat_receipt: fileSchema.optional().nullable(),
	invoice: fileSchema,
	loading_bill: fileSchema,

	arrival_date: z.date({
		required_error: "Please select an arrival date",
		invalid_type_error: "That's not a valid date",
	}),
});

export type CreateClearanceInput = z.infer<typeof CreateClearanceSchema>;
