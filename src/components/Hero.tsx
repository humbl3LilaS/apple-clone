import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../util";
import { useEffect, useState } from "react";

const Hero = () => {
	const [videoSrc, setVideoSrc] = useState(heroVideo);

	useEffect(() => {
		const mediaQuery: MediaQueryList = window.matchMedia("(min-width: 760px)");

		const handleMediaChange = (e: MediaQueryListEventInit) => {
			console.log("media change");
			setVideoSrc(e.matches ? heroVideo : smallHeroVideo);
		};

		handleMediaChange(mediaQuery);

		mediaQuery.addEventListener("change", handleMediaChange);

		return () => {
			mediaQuery.removeEventListener("change", handleMediaChange);
		};
	}, []);

	useGSAP(() => {
		gsap.to("#hero-title", { opacity: 1, delay: 0.5, duration: 1 });
		gsap.to("#cta", { opacity: 1, delay: 2, y: -50, duration: 1 });
	}, []);

	return (
		<section className="w-full nav-height bg-black relative">
			<div className="h-5/6 w-full flex-center flex-col">
				<p
					className="hero-title"
					id="hero-title">
					Iphone 15 pro
				</p>
				<div className="w-9/12 md:w-10/12">
					<video
						autoPlay
						muted
						playsInline={true}
						key={videoSrc}>
						<source src={videoSrc} />
					</video>
				</div>
			</div>
			<div
				id="cta"
				className="flex flex-col items-center opacity-0 traslate-y-20">
				<a
					href="#hightlight"
					className="btn">
					Buy
				</a>
				<p className="font-normal text-xl">From $199/month or $999</p>
			</div>
		</section>
	);
};

export default Hero;
