import { TabContext } from "../context/TabContextProvider"
import TabContent from "./TabContent"
import TabTitle from "./TabTitle"
import { memo, useContext, useLayoutEffect, useState } from "react";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";
import { useGesture } from '@use-gesture/react'
import { TabSize, TabType } from "../types";
import TabEmptyOrigin from "./dragging/TabEmptyOrigin";

type Props = {
    tabData: TabType,
}

const Tab = ({ tabData }: Props) => {
    const { title, id, dimensions } = tabData;
    console.log(id, "rerendered")
    const { tabSize, setTabSize } = useContext(TabContext);
    const { attributes, listeners, setNodeRef, node, transform, transition, isDragging } = useSortable({
        id,
        data: {
            type: "tab",
            tab: {
                id,
                title
            }
        }
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };
    useGesture(
        {
            onPinchEnd: ({ movement }) => {
                if (movement[0] > 1) {
                    if (tabSize !== 2) setTabSize((prev) => (prev += 1) as TabSize)
                } else {
                    if (tabSize !== 0) setTabSize((prev) => (prev -= 1) as TabSize)
                }
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
        <TabEmptyOrigin ref={setNodeRef} tabSize={tabSize} style={style}/>
    )
    return (
        <div style={{ ...style, ...dimensions }} ref={setNodeRef}
            className={`border-2 border-black bg-white shrink-0 snap-start
                ${tabSize === 0 && "w-1/3"} ${tabSize === 1 && "w-1/2"} ${tabSize === 2 && "w-2/3"}`}>
            <TabTitle title={title} {...attributes} {...listeners} />
            <TabContent fileId={id} />
        </div>
    )
}

export default memo(Tab)