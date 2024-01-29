import { StateCreator } from "zustand";
import defaultTabSectionData from "../../data/tabSections.json"
import { DraggingTabSection, TabSectionType } from "../../types";
import { v4 as uuidv4 } from 'uuid';

export type TabSectionSlice = {
    tabSectionData: TabSectionType[],
    draggingTabSection: DraggingTabSection | null,
    addTabSection: (tabId: number | string) => void,
    editSectionTitle: (id: number | string, newTitle: string) => void
}

export const tabSectionSlice: StateCreator<TabSectionSlice> = (set) => ({
    tabSectionData: defaultTabSectionData,
    draggingTabSection: null,
    addTabSection: (tabId) => set((state) => {
        return { tabSectionData: [...state.tabSectionData, { fileId: tabId, title: "default", index: 2, id: uuidv4() }] }
    }),
    editSectionTitle: (id, newTitle) => (
        // save to db
        set((state) => ({
            tabSectionData: state.tabSectionData.map(tab => (
                tab.id === id ? { id: tab.id, index: tab.index, title: newTitle, fileId: tab.fileId } : tab)
            )
        }))
    )
})