import clsx from "clsx";
import Link from "next/link";
import { roboto_mono } from "./fonts";

type BreadcrumbProps = {
	label: string;
	href: string;
	isActive?: boolean;
};
const Breadcrumb = ({ breadcrumbs }: { breadcrumbs: BreadcrumbProps[] }) => {
	return (
		<nav aria-label="Breadcrumb" className="mb-6 block">
			<ul className={clsx(roboto_mono.className, "flex text-xl md:text-2xl")}>
				{breadcrumbs.map((bread, index) => (
					<li
						key={bread.href}
						className={clsx(
							bread.isActive ? "text-green-500" : "text-green-900",
						)}>
						<Link href={bread.href}>{bread.label}</Link>
						{index < breadcrumbs.length - 1 ? (
							<span className="mx-3 inline-block">/</span>
						) : null}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Breadcrumb;
