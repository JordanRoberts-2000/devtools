import { memo, useState } from "react";
import noteStore from "../../../store/notesStore"
import settings from "../../../../../data/settings.json"

type Props = {
    title: string,
    tabId: string | number
}

const TabTitle = ({ title, tabId }: Props) => {
    const [ editedTitle, setEditedTitle ] = useState(null);
    const [ titleEditable, setTitleEditable ] = useState(false);
    const editTitle = noteStore(state => state.editTitle);
    const removeTab = noteStore(state => state.removeTab);
    const increaseTabSize = noteStore(state => state.increaseTabSize);
    const decreaseTabSize = noteStore(state => state.decreaseTabSize);
    const handleEditTitle = (e: any) => {
        setTitleEditable(false);
        if(e.target.value.length === 0)return
        setEditedTitle(e.target.value);
        editTitle(tabId, e.target.value);
    }
    return (
        <>
            {settings.sizeOptionButtonsOnTabs &&
                <div>
                    <button onClick={() => increaseTabSize(tabId)}>+</button>
                    <button className="ml-2" onClick={() => decreaseTabSize(tabId)}>-</button>
                </div>
            }
            {!titleEditable ? 
                <div className="ml-4" onDoubleClick={() => setTitleEditable(true)}>
                    {editedTitle ?? title}
                </div>
            :
                <input type="text" autoFocus defaultValue={title} onKeyDown={(e) => {if(e.key === "Enter")handleEditTitle(e)}} 
                    onBlur={(e) => handleEditTitle(e)}/>
            }
            <ul className="ml-auto mr-2 gap-4 flex">
                <li><button onClick={() => removeTab(tabId)}>&times;</button></li>
            </ul>
        </>
    )
}

export default memo(TabTitle)