import { StateCreator } from "zustand";
import { TabSize, TabType } from "../../types";
import defaultTabData from "../../data/tabs.json"
import { v4 as uuidv4 } from 'uuid';

export type TabSlice = {
    tabs: TabType[],
    draggingTab: (TabType & { xy: { x: number | null, y: number | null } }) | null,
    addTab: () => void,
    removeTab: (id: number | string) => void,
    removeAllTabs: () => void,
    increaseTabSize: (id: number | string) => void,
    decreaseTabSize: (id: number | string) => void,
    setAllTabSizes: (size: TabSize) => void,
    editTitle: (id: number | string, title: string) => void
}

export const tabSlice: StateCreator<TabSlice> = (set) => ({
    tabs: defaultTabData.map((tabdata) => ({ ...tabdata, size: 2 })),
    draggingTab: null,
    addTab: () => set((state) => {
        if (state.tabs.length === 0) {
            return { tabs: [{ id: uuidv4(), title: "default", size: 3 }] }
        }
        if (state.tabs.length === 1) {
            return ({ tabs: [{ id: state.tabs[0].id, title: state.tabs[0].title, size: 2 }, { id: uuidv4(), title: "default", size: 2 }] });
        }
        return { tabs: [...state.tabs, { id: uuidv4(), title: "default", size: 2 }] }
    }),
    removeTab: (id) => set((state) => {
        const filteredTabs = state.tabs.filter((el) => el.id !== id)
        if (state.tabs.length === 2) {
            return ({ tabs: filteredTabs.map(tab => ({ ...tab, size: 3 })) })
        }
        if (state.tabs.length === 3) {
            if (filteredTabs[0].size === filteredTabs[1].size) {
                return ({ tabs: filteredTabs.map(tab => ({ ...tab, size: 2 })) })
            }
            if (filteredTabs[0].size < filteredTabs[1].size) {
                return ({ tabs: filteredTabs.map((tab, i) => ({ ...tab, size: i === 0 ? 1 : 3 })) })
            }
            if (filteredTabs[0].size > filteredTabs[1].size) {
                return ({ tabs: filteredTabs.map((tab, i) => ({ ...tab, size: i === 0 ? 3 : 1 })) })
            }
        }
        return ({ tabs: filteredTabs })
    }),
    removeAllTabs: () => set(() => ({ tabs: [] })),
    increaseTabSize: (id) => set((state) => {
        if (state.tabs.length < 2) return state
        const index = state.tabs.findIndex((el) => el.id === id);
        if (index === -1) return state;
        if (state.tabs[index].size < 3) {
            if (state.tabs.length === 2) {
                return { tabs: state.tabs.map((el, i) => ({ ...el, size: (i === index ? el.size + 1 : el.size - 1) as TabSize })) }
            } else {
                return { tabs: state.tabs.map((el, i) => (i === index ? { ...el, size: (el.size + 1) as TabSize } : el)) };
            }
        }
        return state;
    }),
    decreaseTabSize: (id) => set((state) => {
        if (state.tabs.length < 2) return state
        const index = state.tabs.findIndex((el) => el.id === id);
        if (index === -1) return state;
        if (state.tabs[index].size > 1) {
            if (state.tabs.length === 2) {
                return { tabs: state.tabs.map((el, i) => ({ ...el, size: (i === index ? el.size - 1 : el.size + 1) as TabSize })) }
            } else {
                return {
                    tabs: state.tabs.map((el, i) => (i === index ? { ...el, size: (el.size - 1) as TabSize } : el))
                };
            }
        }
        return state;
    }),
    setAllTabSizes: (size) => set((state) => ({ tabs: state.tabs.map(el => ({ ...el, size })) })),
    editTitle: (id, title) => (
        // save to db
        set((state) => ({
            tabs: state.tabs.map(tab => (
                tab.id === id ? { id: tab.id, size: tab.size, title: title } : tab)
            )
        }))
    )
});