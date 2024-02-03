import { CSS } from '@dnd-kit/utilities';
import { TabSectionType } from "../../../../types";
import { useSortable } from "@dnd-kit/sortable";
import TabSectionIsDragging from '../../dragging/TabSectionIsDragging';
import { useEffect, useLayoutEffect, useState } from 'react';
import noteStore from '../../../../store/notesStore';
import DraggableWrapper from '../../../../utils/DraggableWrapper';
import TabSectionTitle from './TabSectionTitle';
import defaultNoteData from "../../../../data/noteSections.json"
import Accordion from '../../../../../../components/accordian/Accordion';

type Props = {
    style?: React.CSSProperties,
    isOverlay?: true,
    titleMode?: boolean
} & TabSectionType

const TabSection = ({ id, title, index, titleMode, fileId, style, isOverlay }: Props) => {
    const [xy, setXy] = useState<{ x: number | null, y: number | null }>({ x: null, y: null })
    const size = noteStore(state => state.tabs.find((tab) => tab.id === fileId)!.size)
    const tabSectionDragging = noteStore(state => state.draggingTabSection)
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
    const handleOnChange = () => {
        const { width, height } = node.current!.getBoundingClientRect()
        setXy({ x: width, y: height })
    }
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
        <TabSectionIsDragging ref={setNodeRef} style={dragStyle} title={title} />
    )
    return (
        <DraggableWrapper className={`border-2 rounded-md p-2 m-2 bg-white`}
            {...attributes} {...listeners} ref={setNodeRef} style={{ ...dragStyle, ...style }}>

            <TabSectionTitle id={id} title={title} />
            {!isOverlay &&
                <Accordion active={titleMode}>
                    {defaultNoteData.filter((el) => el.sectionId === id).map((el) => (
                        <div key={el.id} contentEditable="plaintext-only" onInput={() => handleOnChange()}>
                            {el.content}
                        </div>
                    ))}
                    {!defaultNoteData.filter((el) => el.sectionId === id).length &&
                        <button className="px-4 py-1 border-2 font-medium text-gray-700 rounded-md text-sm"
                            onClick={() => { }}>
                            add section
                        </button>
                        // <div contentEditable="plaintext-only" onInput={() => handleOnChange()}>
                        //     eek
                        // </div>
                        // <div>soup</div>
                    }
                </Accordion>
            }
        </DraggableWrapper>
    )
}

export default TabSection