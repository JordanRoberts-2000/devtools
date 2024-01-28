import { create } from "zustand"
import { TabSlice, tabSlice } from "./slices/tabs.slice"
import { TabSectionSlice, tabSectionSlice } from "./slices/tabSection.slice"

const noteStore = create<TabSlice & TabSectionSlice>()((...a) => ({
    ...tabSlice(...a),
    ...tabSectionSlice(...a)
}))

export default noteStore