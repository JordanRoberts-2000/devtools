import { createPortal } from "react-dom"
import { DragOverlay } from "@dnd-kit/core"
import noteStore from "../../../../store/notesStore"
import Tab from "../../tab/Tab"
import { memo } from "react"
import TabSection from "../../tab/TabSection"
// import TabSection from "../../tabs/TabSection"
// import Tab from "../tab/Tab"

const DragOverlays = ( ) => {
    const draggingTab = noteStore(state => state.draggingTab);
    const draggingTabSection = noteStore(state => state.draggingTabSection);
    return (
        <>
           
                <DragOverlay dropAnimation={{ duration: 400 }} style={{position: "relative"}}>
                    {draggingTab && <Tab title={draggingTab.title} id={draggingTab.id} size={draggingTab.size}
                        style={{width: draggingTab.xy.x!, height: draggingTab.xy.y!}} />}
                    {draggingTabSection && <TabSection title={draggingTabSection.title} id={draggingTabSection!.id}
                        fileId={draggingTabSection.fileId} style={{width: draggingTabSection.xy.x!, height: draggingTabSection.xy.y!}} />}
                </DragOverlay>
              
        </>
    )
}

export default memo(DragOverlays)