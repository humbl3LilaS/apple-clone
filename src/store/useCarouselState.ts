import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CarouselState {
	appState: {
		isEnd: boolean;
		startPlay: boolean;
		videoId: number;
		isLastVideo: boolean;
		isPlaying: boolean;
	};
	setCarouselState: (payload: Partial<CarouselState["appState"]>) => void;
}

export const useCarouselState = create<CarouselState>()(
	immer((set) => ({
		appState: {
			isEnd: false,
			startPlay: false,
			videoId: 0,
			isLastVideo: false,
			isPlaying: false,
		},
		setCarouselState: (payload) =>
			set((state) => {
				state.appState = { ...state.appState, ...payload };
			}),
	})),
);
