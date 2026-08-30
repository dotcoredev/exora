import { create } from "zustand";

type CurrencyFilterStore = {
	from: string | null;
	to: string | null;

	setFrom: (code: string) => void;
	setTo: (code: string) => void;
	swap: () => void;
};

export const useCurrencyFilterStore = create<CurrencyFilterStore>((set) => ({
	from: null,
	to: null,

	setFrom: (from) => set({ from }),
	setTo: (to) => set({ to }),

	swap: () =>
		set((state) => ({
			from: state.to,
			to: state.from,
		})),
}));
