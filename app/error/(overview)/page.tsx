import ErrorLoading from "@/app/error/(overview)/loading";
import Error from "@/components/Error";
import { Suspense } from "react";

export default function ErrorPage() {
	return (
		<Suspense fallback={<ErrorLoading />}>
			<Error />
		</Suspense>
	);
}
