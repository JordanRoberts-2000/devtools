import { useContext, useMemo } from "react"
import TabSection from "./TabSection"
import { TabContext } from "../context/TabContextProvider";
import { SortableContext } from "@dnd-kit/sortable"
import { useQuery } from "react-query";
import tabSectionData from "../data/tabSections.json"

type Props = {
    fileId: number
}

const TabContent = ({ fileId }: Props) => {
    const { editModeActive } = useContext(TabContext)
    const { data, isLoading, isError } = useQuery([fileId], () => tabSectionData.filter((section) => section.fileId === fileId))
    if(isLoading)return(
        <div>loading</div>
    )
    if(!data)return(
        <div>no data</div>
    )
    if(isError)return(
        <div>error getting data</div>
    )
    // console.log(fileId)
    return (
        <div>
            <SortableContext items={data}>
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
            }
        </div>
    )
}

export default TabContent