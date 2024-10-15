import { SyntheticEvent } from "react";
import { HighLightSlide } from "../constant/constant.types";
import { useRefsStore } from "../store/useRefsStore";
import { cn } from "../util/cn";
import { useCarouselState } from "../store/useCarouselState";

const CarouselCard = ({ data }: { data: HighLightSlide }) => {
	const videoRef = useRefsStore((state) => state.videoRef);
	const setLoadedData = useRefsStore((state) => state.setLoadedData);
	const setCarouselState = useCarouselState((state) => state.setCarouselState);

	const onEndHandler = () => {
		const id = data.id - 1;
		if (id !== 3) {
			setCarouselState({ isEnd: true, videoId: id + 1 });
		} else {
			setCarouselState({ isLastVideo: true });
		}
	};

	const onPlayHandler = () => {
		setCarouselState({ isPlaying: true });
	};
	const onMetaDataChange = (e: SyntheticEvent<HTMLVideoElement, Event>) =>
		setLoadedData(e);

	return (
		<div
			id="slider"
			className="pr-20 md:pr-10">
			<div className="video-carousel_container">
				<div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
					<video
						id="video"
						preload="auto"
						playsInline={true}
						muted={true}
						className={cn("cursor-pointer", data.id === 2 && "translate-x-44")}
						ref={(el) => {
							return (videoRef.current[data.id - 1] = el as HTMLVideoElement);
						}}
						onEnded={onEndHandler}
						onPlay={onPlayHandler}
						onLoadedMetadata={(e) => onMetaDataChange(e)}>
						<source src={data.video} />
					</video>
				</div>
				<div className="absolute top-12 left-[5%] z-10">
					{data.textLists.map((text, idx) => (
						<p
							key={idx}
							className="text-xl font-medium md:text-2xl">
							{text}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default CarouselCard;
