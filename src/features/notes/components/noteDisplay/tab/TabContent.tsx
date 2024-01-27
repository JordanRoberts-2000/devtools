// import TabSection from "./TabSection"
// import { SortableContext } from "@dnd-kit/sortable"

import { memo } from "react"

type Props = {
    tabId: number | string
}

const TabContent = ({ tabId }: Props) => {
    return (
        <div>
            {tabId}
            {/* <SortableContext items={data}>
                {data.map((el) => {
                    return <TabSection key={el.id} tabSectionData={el} />
                })}
            </SortableContext>
            {(editModeActive || !data.length) &&
                <button
                    // <button onClick={() => setNoteSections([...noteSections, 1])}
                    className="border-2 border-black hover:rounded-[100%] rounded-[25%] duration-500 px-2 bg-white flex justify-center items-center mx-auto">
                    +
                </button>
            } */}
        </div>
    )
}

export default memo(TabContent)