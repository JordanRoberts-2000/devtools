import { memo, useState } from "react";
import noteStore from "../../../store/notesStore"
import settings from "../../../../../data/settings.json"

type Props = {
    title: string,
    tabId: string | number
}

const TabTitle = ({ title, tabId }: Props) => {
    const [titleEditable, setTitleEditable] = useState(false);
    const editTitle = noteStore(state => state.editTitle);
    const removeTab = noteStore(state => state.removeTab);
    const increaseTabSize = noteStore(state => state.increaseTabSize);
    const decreaseTabSize = noteStore(state => state.decreaseTabSize);
    const toggleTitleMode = noteStore(state => state.toggleTitleMode)
    const handleEditTitle = (e: any) => {
        setTitleEditable(false);
        if (e.target.value.length === 0) return
        editTitle(tabId, e.target.value);
    }
    const titleModeActive = noteStore(state => state.tabs.find(tab => tab.id === tabId)!.titleMode)
    return (
        <>
            {settings.sizeOptionButtonsOnTabs &&
                <div>
                    <button onClick={() => increaseTabSize(tabId)}>+</button>
                    <button className="ml-2" onClick={() => decreaseTabSize(tabId)}>-</button>
                </div>
            }
            <div className="h-[6px] w-[6px] rounded-full bg-blue-500 my-auto" />
            {!titleEditable ?
                <div className="px-2" onDoubleClick={() => setTitleEditable(true)}>
                    {title}
                </div>
                :
                <input className="px-2"
                    type="text" autoFocus defaultValue={title} onKeyDown={(e) => { if (e.key === "Enter") handleEditTitle(e) }}
                    onBlur={(e) => handleEditTitle(e)} />
            }
            <ul className="ml-auto mr-2 gap-4 flex h-full items-center">
                <li>
                    <button onClick={() => toggleTitleMode(tabId)} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={titleModeActive ? "blue" : "black"} className="w-6 h-6 transition-colors">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </button>
                </li>
                <li>
                    <button onClick={() => removeTab(tabId)} className="text-xl">&times;</button>
                </li>
            </ul>
        </>
    )
}

export default memo(TabTitle)