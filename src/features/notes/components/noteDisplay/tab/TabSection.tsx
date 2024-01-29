import { CSS } from '@dnd-kit/utilities';
import { TabSectionType } from "../../../types";
import { useSortable } from "@dnd-kit/sortable";
import TabSectionIsDragging from '../dragging/isDraggingPopover/TabSectionIsDragging';
import { useEffect, useLayoutEffect, useState } from 'react';
import noteStore from '../../../store/notesStore';

const TabSection = ({ id, title, index, fileId, style }: TabSectionType & { style?: React.CSSProperties }) => {
    const [ titleEditable, setTitleEditable ] = useState(false);
    const editSectionTitle = noteStore(state => state.editSectionTitle)
    const [xy, setXy] = useState<{ x: number | null, y: number | null }>({ x: null, y: null })
    const size = noteStore(state => state.tabs.find((tab) => tab.id === fileId)!.size)
    const handleEditTitle = (e: any) => {
        setTitleEditable(false);
        if(e.target.value.length === 0)return
        editSectionTitle(id, e.target.value);
    }
    const { attributes, listeners, setNodeRef, transform, node, transition, isDragging } = useSortable({
        id,
        data: {
            type: "tabSection",
            tabSection: {
                id,
                title,
                fileId,
                xy
            }
        }
    });
    const dragStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
    };
    useLayoutEffect(() => {
        const { width, height } = node.current!.getBoundingClientRect()
        setXy({ x: width, y: height })
    }, [size])
    useEffect(() => {
        const handleResize = () => {
            const { width, height } = node.current!.getBoundingClientRect();
            setXy({ x: width, y: height });
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    if (isDragging) return (
        <TabSectionIsDragging ref={setNodeRef} style={dragStyle} />
    )
    return (
        <div className="border-2 rounded-md border-gray-900 p-2 m-2 bg-white h-36"
            {...attributes} {...listeners} ref={setNodeRef} style={{ ...dragStyle, ...style }}>
            {!titleEditable ?
                <div className={`text-lg font-semibold`} onDoubleClick={() => setTitleEditable(true)}>
                    {title}
                </div>
                :
                <input className="text-lg font-semibold"
                    type="text" autoFocus defaultValue={title} onKeyDown={(e) => { if (e.key === "Enter") handleEditTitle(e) }}
                    onBlur={(e) => handleEditTitle(e)} />
            }
            <div>
                notes
            </div>
        </div>
    )
}

export default TabSection