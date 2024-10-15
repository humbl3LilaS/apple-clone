import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { rightImg, watchImg } from "../util";
import VideoCarousel from "./VideoCarousel";

const HighLights = () => {
	useGSAP(() => {
		gsap.to("#title", { opacity: 1, y: 0 });
		gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
	}, []);
	return (
		<section
			id="highlights"
			className="w-screen h-full common-padding bg-zinc overflow-hidden">
			<div className="screen-max-width">
				<div className="w-full mb-12 items-end justify-between md:flex">
					<h1
						id="title"
						className="section-heading">
						Get the highlights.
					</h1>
					<div className="flex flex-wrap items-end gap-x-5">
						<p className="link">
							Watch the film
							<img
								src={watchImg}
								alt="watch"
								className="ml-2"
							/>
						</p>
						<p className="link">
							Watch the event
							<img
								src={rightImg}
								alt="arrow"
								className="ml-2"
							/>
						</p>
					</div>
				</div>

				<VideoCarousel />
			</div>
		</section>
	);
};

export default HighLights;
