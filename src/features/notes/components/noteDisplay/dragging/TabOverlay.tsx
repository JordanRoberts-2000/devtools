import { createPortal } from "react-dom"
import { DragOverlay } from "@dnd-kit/core"
import noteStore from "../../../store/notesStore"
import Tab from "../tab/Tab"
import { memo } from "react"
// import TabSection from "../../tabs/TabSection"
// import Tab from "../tab/Tab"

const TabOverlay = ( ) => {
    const draggingTab = noteStore(state => state.draggingTab);
    return (
        <>
            {createPortal(
                <DragOverlay dropAnimation={{ duration: 400 }}>
                    {draggingTab && <Tab title={draggingTab.title} id={draggingTab.id} size={draggingTab.size}
                        style={{width: draggingTab.xy.x!, height: draggingTab.xy.y!}}/>}
                    {/* {activeTabSection && <TabSection tabSectionData={activeTabSection} />} */}
                </DragOverlay>
                , document.body)}
        </>
    )
}

export default memo(TabOverlay)