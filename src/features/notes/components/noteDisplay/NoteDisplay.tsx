import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import NoteDragContext from "../../context/NoteDragContext"
import noteStore from "../../store/notesStore"
import clsx from "clsx"
import Tab from "./tab/Tab"
import { useRef } from "react"
import DragOverlays from "./dragging/DragOverlays"

const NoteDisplay = ({ }) => {
    const tabs = noteStore(state => state.tabs)
    const noteSectionRef = useRef<HTMLDivElement>(null)
    const numberOfTabs = noteStore((state) => state.tabs.length);
    const noteDisplayClass = clsx(
        'flex-[7] flex overflow-x-auto relative', {
        'justify-center': numberOfTabs === 1,
        'pr-12': numberOfTabs > 2 && !(numberOfTabs === 3 && tabs.every(tab => tab.size === 1))
    });
    return (
        <NoteDragContext noteSectionRef={noteSectionRef}>
            <div className={noteDisplayClass} ref={noteSectionRef}>
                {/* <div>search tab</div> */}
                <SortableContext items={tabs.map((tab) => tab.id)} strategy={horizontalListSortingStrategy}>
                    {tabs.map((tab) => (
                        <Tab key={tab.id} id={tab.id} title={tab.title} size={tab.size} />
                    ))}
                </SortableContext>
                <div className="bg-white/0 fixed top-0 left-0 w-full h-full pointer-events-none">
                    <DragOverlays />
                </div>
            </div>
        </NoteDragContext>
    )
}

export default NoteDisplay