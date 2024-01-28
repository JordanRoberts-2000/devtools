import { StateCreator } from "zustand";
import defaultTabSectionData from "../../data/tabSections.json"
import { DraggingTabSection, TabSectionType } from "../../types";

export type TabSectionSlice = {
    tabSectionData: TabSectionType[],
    draggingTabSection: DraggingTabSection | null,
}

export const tabSectionSlice: StateCreator<TabSectionSlice> = (_set) => ({
    tabSectionData: defaultTabSectionData,
    draggingTabSection: null
})