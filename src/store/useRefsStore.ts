import { create } from "zustand";
import { MutableRefObject, SyntheticEvent } from "react";

interface RefsState {
	videoRef: MutableRefObject<HTMLVideoElement[]>;
	videoSpanRef: MutableRefObject<HTMLSpanElement[]>;
	videoDivRef: MutableRefObject<HTMLDivElement[]>;
	loadedData: SyntheticEvent<HTMLVideoElement, Event>[];
	setLoadedData: (payload: SyntheticEvent<HTMLVideoElement, Event>) => void;
}

export const useRefsStore = create<RefsState>((set) => ({
	videoRef: { current: [] },
	videoSpanRef: { current: [] },
	videoDivRef: { current: [] },
	loadedData: [],
	setLoadedData: (payload) =>
		set((state) => ({
			...state,
			loadedData: [...state.loadedData, payload],
		})),
}));
