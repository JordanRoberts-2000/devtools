import { create } from "zustand"
import { TabSlice, tabSlice } from "./slices/tabsSlice"

const useStore = create<TabSlice>()((...a) => ({
    ...tabSlice(...a)
}))

export default useStore