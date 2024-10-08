import { fetchPortById } from "@/actions/port";
import configs from "@/configs/config";
import { TClearance } from "@/types/clearance";
import nodemailer from "nodemailer";
export const sendEmailNotification = async (
	recipientEmails: string[],
	clearance: TClearance,
) => {
	try {
		// FETCH THE PORT.
		const port = await fetchPortById(clearance.port_id);
		if (!port) {
			console.error("PORT NOT FOUND");
		}

		const portName = port.data?.port_name;

		// CREATE A TRANSPORTER OBJECT USING GMAIL SMTP SERVER.
		const transporter = nodemailer.createTransport({
			host: configs.smtpHost,
			port: configs.smtpPort,
			secure: true,
			auth: {
				user: configs.smtpUser,
				pass: configs.smtpPass,
			},
		});

		// PREPARE THE EMAIL MESSAGE.
		const mailOptions = {
			from: `"${configs.senderName}" <${configs.senderEmail}>`,
			to: recipientEmails.join(","),
			subject: " New Clearance Raised",
			text: "A new clearance has been raised by a customer. Please login to the admin panel to view the details.",
			html: `<h3> a new clearance has been raised by a customer. Please login to the admin panel to view the details.</h3>
			<P>the new clearance is arrived at ${portName}</P>`,
		};

		// SEND THE EMAIL MESSAGE.

		const info = await transporter.sendMail(mailOptions);

		return {
			status: "success",
			message: "Email sent successfully",
			info,
		};
	} catch (error) {
		console.error("ERROR SENDING EMAIL: ", error);
		return {
			status: "error",
			message: (error as Error).message,
		};
	}
};
