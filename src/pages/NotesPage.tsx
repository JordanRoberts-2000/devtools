import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import Tab from "../features/notes/tabs/Tab"
import { restrictToParentElement } from "@dnd-kit/modifiers"
import defaultTabData from "../features/notes/data/tabs.json"
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from "react"
import { TabType } from "../features/notes/types";
import { createPortal } from "react-dom";
import TabContextProvider from "../features/notes/context/TabContextProvider";

const NotesPage = ({ }) => {
    const [tabData, setTabData] = useState(defaultTabData)
    const [activeTab, setActiveTab] = useState<TabType | null>(null)
    const handleTabDragEnd = (e: DragEndEvent) => {
        const { over, active } = e;
        if (!over || over.id === active.id) return;
        setTabData((prev) => {
            const activeIndex = prev.findIndex((tab) => tab.id === active.id);
            const overIndex = prev.findIndex((tab) => tab.id === over.id);
            console.log(activeIndex, overIndex)
            return arrayMove(prev, activeIndex, overIndex);
        })
    }
    const handleTabDragStart = (e: DragStartEvent) => {
        if (e.active.data.current?.type === "tab") {
            setActiveTab(e.active.data.current.tab)
            return;
        }
    }
    const sensor = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 2
        }
    }))
    return (
        <div className="flex-[8] flex overflow-x-auto pr-12 snap-mandatory snap-x">
            <DndContext onDragEnd={handleTabDragEnd} onDragStart={handleTabDragStart} autoScroll={true}
                modifiers={[restrictToParentElement]} sensors={sensor}>
                <SortableContext items={tabData} strategy={horizontalListSortingStrategy}>
                    {tabData.map((tab) => (
                        <TabContextProvider key={tab.id}>
                            <Tab id={tab.id} title={tab.title} />
                        </TabContextProvider>
                    ))}
                    {createPortal(
                        <DragOverlay dropAnimation={{duration: 300}}>
                            {activeTab && <Tab id={activeTab.id} key={"overlay"} title={activeTab.title} dimensions={activeTab.dimensions}/>}
                        </DragOverlay>
                    , document.body)}
                </SortableContext>
            </DndContext>
        </div>
    )
}

export default NotesPage