import { useRefsStore } from "../store/useRefsStore";
import { pauseImg, playImg, replayImg } from "../util";
import { useCarouselState } from "../store/useCarouselState";

const CarouselController = () => {
	const videoRef = useRefsStore((state) => state.videoRef);
	const isPlaying = useCarouselState((state) => state.appState.isPlaying);
	const isLastVideo = useCarouselState((state) => state.appState.isLastVideo);
	const setCarouselState = useCarouselState((state) => state.setCarouselState);

	const controlBtnHandler = () => {
		if (isLastVideo) {
			setCarouselState({ videoId: 0, isLastVideo: false });
		} else {
			if (!isPlaying) {
				setCarouselState({ isPlaying: !isPlaying });
			} else {
				setCarouselState({ isPlaying: false });
			}
		}
	};

	return (
		<div className="mt-10 flex-center relative">
			<div className="py-5 px-5 flex-center bg-gray-300 backdrop-blur rounded-full">
				{videoRef.current.map((_, idx) => (
					<StatusBar
						key={idx}
						idx={idx}
					/>
				))}
			</div>
			<button
				className="control-btn"
				onClick={controlBtnHandler}>
				<img
					src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
					alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
				/>
			</button>
		</div>
	);
};

export default CarouselController;

const StatusBar = ({ idx }: { idx: number }) => {
	const { videoDivRef, videoSpanRef } = useRefsStore();

	return (
		<div
			key={idx}
			className=" w-3 h-3 mx-2 bg-gray-200 rounded-full relative cursor-pointer"
			ref={(el) => (videoDivRef.current[idx] = el as HTMLDivElement)}>
			<span
				className="absoulte h-full w-full rounded-full"
				ref={(el) => (videoSpanRef.current[idx] = el as HTMLSpanElement)}
			/>
		</div>
	);
};
