import { create } from "zustand"
import { TabSlice, tabSlice } from "./slices/tabs.slice"

const noteStore = create<TabSlice>()((...a) => ({
    ...tabSlice(...a)
}))

export default noteStore