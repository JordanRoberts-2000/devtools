import { useState } from "react";
import noteStore from "../../../../store/notesStore";

type Props = {
    id: number | string,
    title: string
}

const TabSectionTitle = ({id, title}: Props) => {
    const [titleEditable, setTitleEditable] = useState(false);
    const editSectionTitle = noteStore(state => state.editSectionTitle)
    const handleEditTitle = (e: any) => {
        setTitleEditable(false);
        if (e.target.value.length === 0) return
        editSectionTitle(id, e.target.value);
    }
    return (
        <>
            {!titleEditable ?
                <div className={`text-lg font-semibold`} onDoubleClick={() => setTitleEditable(true)}>
                    {title}
                </div>
                :
                <input className="text-lg font-semibold"
                    type="text" autoFocus defaultValue={title} onKeyDown={(e) => { if (e.key === "Enter") handleEditTitle(e) }}
                    onBlur={(e) => handleEditTitle(e)} />
            }
        </>
    )
}

export default TabSectionTitle