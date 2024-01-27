import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import NoteDragContext from "./dragging/NoteDragContext"
import noteStore from "../../store/notesStore"
import clsx from "clsx"
import Tab from "./tab/Tab"

const NoteDisplay = ({ }) => {
    const tabs = noteStore(state => state.tabs)
    const numberOfTabs = noteStore((state) => state.tabs.length);
    const noteDisplayClass = clsx(
        'flex-[8] flex overflow-x-auto snap-mandatory snap-x ', {
        'justify-center': numberOfTabs === 1,
        'pr-12': numberOfTabs > 2,
        'pr-0': (numberOfTabs === 3 && tabs.every(tab => tab.size === 1))
    });
    return (
        <div className={noteDisplayClass}>
            <NoteDragContext>
                <SortableContext items={tabs.map((tab) => tab.id)} strategy={horizontalListSortingStrategy}>
                    {tabs.map((tab) => (
                        <Tab key={tab.id} id={tab.id} title={tab.title} size={tab.size} />
                    ))}
                </SortableContext>
            </NoteDragContext>
        </div>
    )
}

export default NoteDisplay