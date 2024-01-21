import { useDroppable } from "@dnd-kit/core";
import TabContextProvider, { TabContext } from "../context/TabContextProvider"
import TabContent from "./TabContent"
import TabTitle from "./TabTitle"
import { useContext, useEffect, useId, useLayoutEffect, useState } from "react";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";
import { useGesture } from '@use-gesture/react'
import { TabSize } from "../types";

type Props = {
    id: number,
    title: string,
    dimensions?: {
        width: number,
        height: number
    }
}

const Tab = ({ id, title, dimensions }: Props) => {
    const { tabSize, setTabSize } = useContext(TabContext);
    const [xy, setXy] = useState({ width: 0, height: 0 })
    const { attributes, listeners, setNodeRef, node, transform, transition, isDragging } = useSortable({
        id, 
        data: {
            type: "tab",
            tab: {
                id,
                title,
                dimensions: xy
            }
        },
        disabled: tabSize == 2
    });
    useLayoutEffect(() => {
        const { width, height } = node.current!.getBoundingClientRect()
        setXy({ width, height })
    }, [tabSize])
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    useGesture(
        {
          onPinchEnd: ({ event,origin, offset, movement }) => {
            if(movement[0] > 1){
                console.log("zoom out")
                if(tabSize !== 2)setTabSize((prev) => (prev += 1) as TabSize)
            }else{
                console.log("zoom in")
                if(tabSize !== 0)setTabSize((prev) => (prev -= 1) as TabSize)
            }
            // console.log('test', movement, movement[0]);
          },
        },
        {
            target: node,
            pinch: {
                threshold: 0.1,
                pointer: { touch: true }
            }
        }
      )
    if (isDragging) return (
        <div style={style} ref={setNodeRef}
            className={`border-2 border-red-800 border-dashed bg-white shrink-0 snap-start
            ${tabSize === 0 && "w-1/3"} ${tabSize === 1 && "w-1/2"} ${tabSize === 2 && "w-full"}`} />
    )
    return (
            <div style={{ ...style, ...dimensions }} ref={setNodeRef}
                className={`border-2 border-black bg-white shrink-0 snap-start
                ${tabSize === 0 && "w-1/3"} ${tabSize === 1 && "w-1/2"} ${tabSize === 2 && "w-full"}`}>
                <TabTitle title={title} {...attributes} {...listeners} />
                <TabContent />
            </div>
    )
}

export default Tab