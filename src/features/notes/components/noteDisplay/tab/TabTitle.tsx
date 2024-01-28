import { memo } from "react";
import noteStore from "../../../store/notesStore"
import settings from "../../../../../data/settings.json"

type Props = {
    title: string,
    tabId: string | number
}

const TabTitle = ({ title, tabId }: Props) => {
    const removeTab = noteStore(state => state.removeTab);
    const increaseTabSize = noteStore(state => state.increaseTabSize);
    const decreaseTabSize = noteStore(state => state.decreaseTabSize);
    return (
        <>
            {settings.sizeOptionButtonsOnTabs &&
                <div>
                    <button onClick={() => increaseTabSize(tabId)}>+</button>
                    <button className="ml-2" onClick={() => decreaseTabSize(tabId)}>-</button>
                </div>
            }
            <div className="ml-4">{title}</div>
            <ul className="ml-auto mr-2 gap-4 flex">
                <li className="text-sm">
                    {/* <button onClick={() => setEditModeActive((prev) => !prev)} className={`${editModeActive && "text-green-600"}`}>
                        edit-mode
                    </button> */}
                </li>
                <li><button onClick={() => removeTab(tabId)}>&times;</button></li>
            </ul>
        </>
    )
}

export default memo(TabTitle)