import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { hightlightsSlides } from "../constant";
import { useCarouselState } from "../store/useCarouselState";
import CarouselCard from "./CarouselCard";
import CarouselController from "./CarouselController";
import { useRefsStore } from "../store/useRefsStore";
import { useEffect } from "react";

const VideoCarousel = () => {
	const isPlaying = useCarouselState((state) => state.appState.isPlaying);
	const startPlay = useCarouselState((state) => state.appState.startPlay);
	const isEnd = useCarouselState((state) => state.appState.isEnd);
	const videoId = useCarouselState((state) => state.appState.videoId);
	const setCarouselState = useCarouselState((state) => state.setCarouselState);
	const videoSpanRef = useRefsStore((state) => state.videoSpanRef);
	const videoRef = useRefsStore((state) => state.videoRef);
	const videoDivRef = useRefsStore((state) => state.videoDivRef);
	const loadedData = useRefsStore((state) => state.loadedData);

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);
		// slider animation to move the video out of the screen and bring the next video in
		gsap.to("#slider", {
			transform: `translateX(${-100 * videoId}%)`,
			duration: 2,
			ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
		});

		// video animation to play the video when it is in the view
		gsap.to("#video", {
			scrollTrigger: {
				trigger: "#video",
				toggleActions: "restart none none none",
			},
			onComplete: () => {
				setCarouselState({ startPlay: true, isPlaying: true });
			},
		});
	}, [isEnd, videoId]);

	useEffect(() => {
		let currentProgress = 0;
		const span = videoSpanRef.current;

		if (span[videoId]) {
			// animation to move the indicator
			const anim = gsap.to(span[videoId], {
				onUpdate: () => {
					// get the progress of the video
					const progress = Math.ceil(anim.progress() * 100);

					if (progress != currentProgress) {
						currentProgress = progress;

						// set the width of the progress bar
						gsap.to(videoDivRef.current[videoId], {
							width:
								window.innerWidth < 760
									? "10vw" // mobile
									: window.innerWidth < 1200
									? "10vw" // tablet
									: "4vw", // laptop
						});

						// set the background color of the progress bar
						gsap.to(span[videoId], {
							width: `${currentProgress}%`,
							backgroundColor: "white",
						});
					}
				},

				// when the video is ended, replace the progress bar with the indicator and change the background color
				onComplete: () => {
					if (isPlaying) {
						gsap.to(videoDivRef.current[videoId], {
							width: "12px",
						});
						gsap.to(span[videoId], {
							backgroundColor: "#afafaf",
						});
					}
				},
			});

			if (videoId == 0) {
				anim.restart();
			}

			// update the progress bar
			const animUpdate = () => {
				anim.progress(
					videoRef.current[videoId].currentTime /
						hightlightsSlides[videoId].videoDuration,
				);
			};

			if (isPlaying) {
				// ticker to update the progress bar
				gsap.ticker.add(animUpdate);
			} else {
				// remove the ticker when the video is paused (progress bar is stopped)
				gsap.ticker.remove(animUpdate);
			}
		}
	}, [videoId, startPlay]);

	useEffect(() => {
		if (loadedData.length > 3) {
			if (!isPlaying) {
				videoRef.current[videoId].pause();
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				startPlay && videoRef.current[videoId].play();
			}
		}
	}, [startPlay, videoId, isPlaying, loadedData]);

	return (
		<>
			<div className="flex items-center">
				{hightlightsSlides.map((item) => (
					<CarouselCard
						key={item.id}
						data={item}
					/>
				))}
			</div>
			<CarouselController />
		</>
	);
};

export default VideoCarousel;
