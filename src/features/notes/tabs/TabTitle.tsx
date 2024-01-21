import { HTMLAttributes, useContext, useEffect } from "react"
import { TabContext } from "../context/TabContextProvider"
import { TabSize } from "../types"

type Props = HTMLAttributes<HTMLDivElement> & {
    title: string
}

const TabTitle = ({title, ...rest}: Props) => {
    const { editModeActive, setEditModeActive, setTabSize, tabSize } = useContext(TabContext)
    const handleSizeIncrease = () => {
        if(tabSize !== 2)setTabSize((prev) => (prev += 1) as TabSize)
    }
    const handleSizeDecrease = () => {
        if(tabSize !== 0)setTabSize((prev) => (prev -= 1) as TabSize)
    }
    return (
        <div className="p-2 border-2 border-black flex" {...rest}>
            <button onClick={() => handleSizeIncrease()}>+</button>
            <button className="ml-2" onClick={() => handleSizeDecrease()}>-</button>
            <div className="ml-4">{title}</div>
            <ul className="ml-auto mr-2 gap-4 flex">
                <li className="text-sm">
                    <button onClick={() => setEditModeActive((prev) => !prev)} className={`${editModeActive && "text-green-600"}`}>
                        edit-mode
                    </button>
                </li>
                <li>&times;</li>
            </ul>
        </div>
    )
}

export default TabTitle