import { DragOverlay } from "@dnd-kit/core"
import { createPortal } from "react-dom"
import TabSection from "../TabSection"
import Tab from "../Tab"
import { TabSectionType, TabType } from "../../types"

type Props = {
    activeTab: TabType | null
    activeTabSection: TabSectionType | null
}

const TabOverlay = ({ activeTab, activeTabSection }: Props) => {
    return (
        <>
            {createPortal(
                <DragOverlay dropAnimation={{ duration: 400 }}>
                    {activeTab && <Tab tabData={activeTab} />}
                    {activeTabSection && <TabSection tabSectionData={activeTabSection} />}
                </DragOverlay>
                , document.body)}
        </>
    )
}

export default TabOverlay