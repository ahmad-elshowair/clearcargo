"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSearchengin } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }: { placeholder: string }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", "1");
		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}
		router.replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<section className="relative flex flex-1 flex-shrink-0">
			<label className="sr-only" htmlFor="search">
				Search
			</label>
			<Input
				onChange={(e) => handleSearch(e.target.value)}
				placeholder={placeholder}
				className="peer block w-full rounded-md border border-green-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-green-500"
			/>
			<FaSearchengin className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-green-500 peer-focus:text-green-900" />
		</section>
	);
};
export default Search;
