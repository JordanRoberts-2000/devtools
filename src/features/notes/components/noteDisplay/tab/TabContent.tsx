import TabSection from "./TabSection"
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable"

import { memo } from "react"
import noteStore from "../../../store/notesStore"

type Props = {
    tabId: number | string
}

const TabContent = ({ tabId }: Props) => {
    const taskSectionData = noteStore(state => state.tabSectionData.filter(el => el.fileId === tabId))
    const taskSectionIds = taskSectionData.map(tab => tab.id)
    return (
        <div className="flex-1 shrink-0 overflow-y-auto">
            <SortableContext items={taskSectionIds} strategy={rectSwappingStrategy}>
                {taskSectionData.map((el) => {
                    return <TabSection key={el.id} title={el.title} id={el.id} fileId={el.fileId} index={el.index} />
                })}
            </SortableContext>
        </div>
    )
}

export default memo(TabContent)