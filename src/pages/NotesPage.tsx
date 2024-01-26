import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import Tab from "../features/notes/tabs/Tab"
import defaultTabData from "../features/notes/data/tabs.json"
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useMemo, useState } from "react"
import { TabSectionType, TabType } from "../features/notes/types";
import TabContextProvider from "../features/notes/context/TabContextProvider";
import TabOverlay from "../features/notes/tabs/dragging/TabOverlay";
import { useQueryClient } from "react-query";
import viewTransition from "../utils/viewTransition";

const NotesPage = ({ }) => {
    const [tabData, setTabData] = useState(defaultTabData)
    const [activeTab, setActiveTab] = useState<TabType | null>(null)
    const [activeTabSection, setActiveTabSection] = useState<TabSectionType | null>(null)
    const queryClient = useQueryClient()
    const sensor = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 2
        }
    }))
    const handleDragStart = (e: DragStartEvent) => {
        if (e.active.data.current?.type === "tab") {
            setActiveTab(e.active.data.current.tab)
            return;
        }
        if (e.active.data.current?.type === "tabSection") {
            setActiveTabSection(e.active.data.current.tabSection)
            return
        }
    }
    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const activeIsTabSection = active.data.current?.type === "tabSection";
        const overIsTabSection = over.data.current?.type === "tabSection";
        if (!activeIsTabSection) return;

        // Im dropping a Task over another Task
        if (overIsTabSection && activeIsTabSection) {
            if (over.data.current!.tabSection.fileId !== active.data.current!.tabSection.fileId) {
                viewTransition(() => {
                    queryClient.setQueryData([active.data.current!.tabSection.fileId], (prev: TabSectionType[] | undefined) => {
                        const hoof = prev!.filter((item) => item.id !== active.id)
                        return hoof
                    })
                    queryClient.setQueryData([over.data.current!.tabSection.fileId], (prev: TabSectionType[] | undefined) => {
                        const overIndex = prev!.findIndex((t) => t.id === over.id);
                        prev!.splice(overIndex, 0, { ...active.data.current!.tabSection, fileId: over.data.current!.tabSection.fileId });
                        return prev!
                    })
                })
            } else {
                queryClient.setQueryData([over.data.current!.tabSection.fileId], (prev: TabSectionType[] | undefined) => {
                    const activeIndex = prev!.findIndex((t) => t.id === active.id);
                    const overIndex = prev!.findIndex((t) => t.id === over.id);
                    return arrayMove(prev!, activeIndex, overIndex);
                })
            }
        }
        const isOverAColumn = over.data.current?.type === "tab";

        // Im dropping a Task over a column
        if (activeIsTabSection && isOverAColumn) {
            console.log("ATTEMPT", over.data.current!.tab.id)
            queryClient.setQueryData([active.data.current!.tabSection.fileId], (prev: TabSectionType[] | undefined) => {
                const hoof = prev!.filter((item) => item.id !== active.id)
                return hoof
            })
            queryClient.setQueryData([over.data.current!.tab.id], (prev: TabSectionType[] | undefined) => {
                const overIndex = prev!.findIndex((t) => t.id === over.id);
                prev!.splice(overIndex, 0, { ...active.data.current!.tabSection, fileId: over.data.current!.tab.id });
                return prev!
            })
        }

    }
    const handleDragEnd = (event: DragEndEvent) => {
        setActiveTab(null);
        setActiveTabSection(null);
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;
        const isActiveAColumn = active.data.current?.type === "tab";
        if (!isActiveAColumn) return;
        setTabData((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
            const overColumnIndex = columns.findIndex((col) => col.id === overId);
            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }
    const memoTabs = useMemo(() => (
        tabData.map((tab) => (
            <TabContextProvider key={tab.id}>
                <Tab tabData={tab} />
            </TabContextProvider>
        ))
    ), [tabData])
    const tabDataIds = useMemo(() => tabData.map((item) => item.id), [tabData])
    return (
        <div className="flex-[8] flex overflow-x-auto pr-12 snap-mandatory snap-x">
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} autoScroll={true}
                sensors={sensor} onDragOver={handleDragOver}>
                <SortableContext items={tabDataIds}>
                    {memoTabs}
                    <TabOverlay activeTab={activeTab} activeTabSection={activeTabSection} />
                </SortableContext>
            </DndContext>
        </div>
    )
}

export default NotesPage