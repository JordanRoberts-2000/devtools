import { StateCreator } from "zustand";
import { TabSize, TabType } from "../../types";

export type TabSlice = {
    tabs: TabType[],
    addTab: (id: number | string) => void,
    removeTab: (id: number | string) => void,
    removeAllTabs: () => void,
    increaseTabSize: (id: number | string) => void,
    decreaseTabSize: (id: number | string) => void,
    setAllTabSizes: (size: TabSize) => void
}

export const tabSlice: StateCreator<TabSlice> = (set) => ({
    tabs: [],
    addTab: (id) => set((state) => ({
        tabs: [...state.tabs, { id, title: "default", size: 1 }]
    })),
    removeTab: (id) => set((state) => ({ tabs: state.tabs.filter((el) => el.id !== id) })),
    removeAllTabs: () => set(() => ({tabs: []})),
    increaseTabSize: (id) => set((state) => {
        const index = state.tabs.findIndex((el) => el.id === id);
        if (index === -1) return state;
        if (state.tabs[index].size < 2) {
            return {
                tabs: state.tabs.map((el, i) => (i === index ? { ...el, size: (el.size++) as TabSize } : el))
            };
        }
        return state;
    }),
    decreaseTabSize: (id) => set((state) => {
        const index = state.tabs.findIndex((el) => el.id === id);
        if (index === -1) return state;
        if (state.tabs[index].size > 0) {
            return {
                tabs: state.tabs.map((el, i) => (i === index ? { ...el, size: (el.size--) as TabSize } : el))
            };
        }
        return state;
    }),
    setAllTabSizes: (size) => set((state) => ({tabs: state.tabs.map(el => ({ ...el, size }))}))
});