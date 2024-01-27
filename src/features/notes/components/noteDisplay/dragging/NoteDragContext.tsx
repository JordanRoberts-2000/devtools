import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import TabOverlay from "./TabOverlay"
import noteStore from "../../../store/notesStore"
import { arrayMove } from "@dnd-kit/sortable"
import { memo } from "react"

type Props = {
    children: React.ReactNode
}

const NoteDragContext = ({ children }: Props) => {
    const sensor = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 2
        }
    }))
    const handleDragStart = (e: DragStartEvent) => {
        // console.log(e.active)
        if (e.active.data.current?.type === "tab") {
            noteStore.setState(() => ({ 
                draggingTab: {
                    title: e.active.data.current?.tab.title, 
                    size: 1, 
                    id: "dragging", 
                    xy: {
                        x: e.active.data.current?.tab.xy.x,
                        y: e.active.data.current?.tab.xy.y,
                    }} 
                }))
            return;
        }
        // if (e.active.data.current?.type === "tabSection") {
        //     // setActiveTabSection(e.active.data.current.tabSection)
        //     return
        // }
    }
    const handleDragOver = (event: DragOverEvent) => {
        
        // console.log(active)
        // if (!over || active.id === over.id) return;
        // const activeIsTabSection = active.data.current?.type === "tabSection";
        // const overIsTabSection = over.data.current?.type === "tabSection";
        // if (!activeIsTabSection) return;

        // // Im dropping a Task over another Task
        // if (overIsTabSection && activeIsTabSection) {
        //     if (over.data.current!.tabSection.fileId !== active.data.current!.tabSection.fileId) {

        //     } else {

        //     }
        // }
        // const isOverAColumn = over.data.current?.type === "tab";

        // // Im dropping a Task over a column
        // if (activeIsTabSection && isOverAColumn) {
        //     console.log("ATTEMPT", over.data.current!.tab.id)

        // }

    }
    const handleDragEnd = (event: DragEndEvent) => {
        noteStore.setState(() => ({ draggingTab: null}));
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;
        const isActiveAColumn = active.data.current?.type === "tab";
        if (!isActiveAColumn) return;
        console.log(activeId, overId)
        noteStore.setState((state) => {
            const activeColumnIndex = state.tabs.findIndex((tab) => tab.id === activeId);
            const overColumnIndex = state.tabs.findIndex((tab) => tab.id === overId);
            return ({ tabs: arrayMove(state.tabs, activeColumnIndex, overColumnIndex) })
        })
        // setActiveTabSection(null);
        
    }
    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} autoScroll={true}
            sensors={sensor} onDragOver={handleDragOver} >
            {children}
            <TabOverlay />
        </DndContext>
    )
}

export default memo(NoteDragContext)