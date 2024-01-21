import { useContext, useState } from "react"
import TabSection from "./TabSection"
import tabDefault from "../data/tabsections.json"
import { TabContext } from "../context/TabContextProvider";
import { TabSections } from "../types";


const TabContent = ({ }) => {
    const { editModeActive } = useContext(TabContext)
    const [noteSections, setNoteSections] = useState<TabSections[]>(tabDefault);
    return (
        <div>
            {noteSections.map((el) => {
                return <TabSection key={el.id} index={el.index} title={el.title}/>
            })}
            {(editModeActive || !noteSections.length) &&
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