import TabTitle from "./TabTitle"
import clsx from 'clsx';
import { memo, useEffect, useLayoutEffect, useState } from "react";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";
import { useGesture } from '@use-gesture/react'
import { TabType } from "../../../types";
import noteStore from "../../../store/notesStore";
import TabContent from "./TabContent";
import DraggableWrapper from "../dragging/DraggableWrapper";

const Tab = ({ title, size, id, style }: TabType & { style?: React.CSSProperties }) => {
    const increaseTabSize = noteStore(state => state.increaseTabSize);
    const decreaseTabSize = noteStore(state => state.decreaseTabSize);
    const [xy, setXy] = useState<{ x: number | null, y: number | null }>({ x: null, y: null })
    const { attributes, listeners, setNodeRef, node, transform, transition } = useSortable({
        id,
        disabled: xy.x ? false : true,
        data: {
            type: "tab",
            tab: {
                id,
                title,
                xy: xy
            }
        }
    });
    const dragStyles = {
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
    useGesture({
        onPinchEnd: ({ movement }) => {
            movement[0] > 1 ? increaseTabSize(id) : decreaseTabSize(id)
        }
    }, {
        target: node,
        pinch: { threshold: 0, pointer: { touch: true } }
    }
    )
    const tabClass = clsx(
        'border-2 border-black bg-white shrink-0 snap-start', {
        'w-1/3': size === 1,
        'w-1/2': size === 2,
        'w-2/3': size === 3
    });
    return (
        <div style={{ ...style, ...dragStyles }} ref={setNodeRef}
            className={tabClass}>
            <DraggableWrapper className="p-2 border-2 border-black flex" {...attributes} {...listeners}>
                <TabTitle title={title} tabId={id} />
            </DraggableWrapper>
            <TabContent tabId={id} />
        </div>
    )
}

export default memo(Tab)
