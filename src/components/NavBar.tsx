import { navLists } from "../constant";
import { appleImg, bagImg, searchImg } from "../util";

const NavBar = () => {
	return (
		<header className="w-full p-5 flex justify-between items-center sm:px-10">
			<nav className="w-full screen-max-width flex">
				<img
					src={appleImg}
					alt="apple"
					className="aspect-square w-6"
				/>
				<ul className="flex-1 flex justify-center items-center gap-x-8 max-sm:hidden">
					{navLists.map((item) => (
						<li
							key={item}
							className="px-5 text-sm text-gray cursor-pointer hover:text-white transition-colors duration-300">
							{item}
						</li>
					))}
				</ul>
				<div className="flex justify-center items-baseline gap-x-7 max-sm:justify-end max-sm:flex-1">
					<img
						src={searchImg}
						alt="search"
						className="aspect-square w-6"
					/>
					<img
						src={bagImg}
						alt="bag"
						className="aspect-square w-6"
					/>
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
