import TabSection from "./tabSection/TabSection"
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable"

import { memo } from "react"
import noteStore from "../../../store/notesStore"

type Props = {
    tabId: number | string
}

const TabContent = ({ tabId }: Props) => {
    const taskSectionData = noteStore(state => state.tabSectionData.filter(el => el.fileId === tabId))
    const taskSectionIds = taskSectionData.map(tab => tab.id)
    const addTask = noteStore(state => state.addTabSection)
    return (
        <div className="flex-1 shrink-0 overflow-y-auto pb-12">
            <SortableContext items={taskSectionIds} strategy={rectSwappingStrategy}>
                {taskSectionData.map((el) => {
                    return <TabSection key={el.id} title={el.title} id={el.id} fileId={el.fileId} index={el.index} />
                })}
            </SortableContext>
            <div className="flex justify-center mt-4">
                <button className="px-4 py-1 bg-black text-white rounded-md text-sm"
                    onClick={() => addTask(tabId)}>
                        add
                </button>
            </div>
        </div>
    )
}

export default memo(TabContent)