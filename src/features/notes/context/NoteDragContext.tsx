import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, rectIntersection, pointerWithin, useSensor, useSensors } from "@dnd-kit/core"
import noteStore from "../store/notesStore"
import { arrayMove } from "@dnd-kit/sortable"
import { memo } from "react"
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { restrictToElement } from "../utils/RestrictDragToElement";

type Props = {
    children: React.ReactNode,
    noteSectionRef: React.RefObject<HTMLDivElement>
}

const NoteDragContext = ({ children, noteSectionRef }: Props) => {
    const sensor = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 2
        }
    }))
    const handleDragStart = (e: DragStartEvent) => {
        document.querySelectorAll(".accordion").forEach((el) => {
            el.setAttribute("opening", '')})
        if (e.active.data.current?.type === "tab") {
            noteStore.setState(() => ({
                draggingTab: {
                    title: e.active.data.current?.tab.title,
                    size: 1,
                    id: "draggingTab",
                    xy: {
                        x: e.active.data.current?.tab.xy.x,
                        y: e.active.data.current?.tab.xy.y,
                    }
                }
            }))
            return;
        }
        if (e.active.data.current?.type === "tabSection") {
            noteStore.setState(() => ({
                draggingTabSection: {
                    title: e.active.data.current?.tabSection.title,
                    id: "draggingTabSection",
                    fileId: e.active.data.current?.tabSection.fileId,
                    xy: {
                        x: e.active.data.current?.tabSection.xy.x,
                        y: e.active.data.current?.tabSection.xy.y
                    }
                }
            }))
            return;
        }
    }
    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const activeIsTabSection = active.data.current?.type === "tabSection";
        const overIsTabSection = over.data.current?.type === "tabSection";
        if (!activeIsTabSection) return;

        // dropping a section over another tab
        if (overIsTabSection && activeIsTabSection) {
            if (over.data.current!.tabSection.fileId !== active.data.current!.tabSection.fileId) {
                // not within same tab
                // rezise
                if (active.data.current?.tabSection.xy.x, over.data.current?.tabSection.xy.x) {
                    noteStore.setState((state) => ({
                        draggingTabSection: {
                            ...state.draggingTabSection!,
                            xy: {
                                x: over.data.current?.tabSection.xy.x,
                                y: state.draggingTabSection?.xy.y!
                            }
                        }
                    }))
                }
                // not within same tab
                noteStore.setState((state) => {
                    const activeTabIndex = state.tabSectionData.findIndex((tab) => tab.id === active.id);
                    const overTabIndex = state.tabSectionData.findIndex((tab) => tab.id === over.id);
                    state.tabSectionData[activeTabIndex].fileId = state.tabSectionData[overTabIndex].fileId;
                    const overIndex = state.tabs.findIndex(obj => obj.id === over.data.current?.tabSection.fileId)
                    const activeIndex = state.tabs.findIndex(obj => obj.id === active.data.current?.tabSection.fileId)
                    const modifier = overIndex > activeIndex ? -1 : 0
                    return ({ tabSectionData: arrayMove(state.tabSectionData, activeTabIndex, overTabIndex + modifier) })
                })
            } else {
                // within same tab
                noteStore.setState((state) => {
                    const activeTabIndex = state.tabSectionData.findIndex((tab) => tab.id === active.id);
                    const overTabIndex = state.tabSectionData.findIndex((tab) => tab.id === over.id);
                    return ({ tabSectionData: arrayMove(state.tabSectionData, activeTabIndex, overTabIndex) })
                })
            }
        }
        const isOverATab = over.data.current?.type === "tab";

        // dropping a section over a tab
        // resize
        if (activeIsTabSection && isOverATab) {
            // noteStore.setState((state) => ({
            //     draggingTabSection: {
            //         ...state.draggingTabSection!,
            //         xy: {
            //             x: over.data.current?.tabSection.xy.x,
            //             y: state.draggingTabSection?.xy.y!
            //         }
            //     }
            // }))
            // console.log("dropping a Task over a column", over.data.current!.tab.id)
            // noteStore.setState((state) => {
            //     const activeIndex = state.tabSectionData.findIndex((t) => t.id === active.id);
            //     state.tabSectionData[activeIndex].fileId = over.id;
            //     return state;
            // });
        }

    }
    const handleDragEnd = (event: DragEndEvent) => {
        document.querySelectorAll(".accordion").forEach((el) => {
            el.removeAttribute("opening")})
        noteStore.setState(() => ({ draggingTab: null }));
        noteStore.setState(() => ({ draggingTabSection: null }));
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;
        const isActiveAColumn = active.data.current?.type === "tab";
        if (!isActiveAColumn) return;
        noteStore.setState((state) => {
            const activeColumnIndex = state.tabs.findIndex((tab) => tab.id === activeId);
            const overColumnIndex = state.tabs.findIndex((tab) => tab.id === overId);
            return ({ tabs: arrayMove(state.tabs, activeColumnIndex, overColumnIndex) })
        })
    }
    const tabActive = noteStore(state => state.draggingTab)
    const collision = tabActive ? rectIntersection : pointerWithin
    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} autoScroll={false} collisionDetection={collision}
            sensors={sensor} onDragOver={handleDragOver} modifiers={[restrictToElement(noteSectionRef), snapCenterToCursor]}>
            {children}
        </DndContext>
    )
}

export default memo(NoteDragContext)