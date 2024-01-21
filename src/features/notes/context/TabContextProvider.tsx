import { SetStateAction, createContext, useState } from "react"
import { TabSize } from "../types"

type Props = {
    children: React.ReactNode
}

type TabContextType = {
    editModeActive: boolean,
    setEditModeActive: React.Dispatch<SetStateAction<boolean>>,
    tabSize: TabSize,
    setTabSize: React.Dispatch<SetStateAction<TabSize>>
}

export const TabContext = createContext<TabContextType>({
    editModeActive: false,
    setEditModeActive: () => {},
    tabSize: 0,
    setTabSize: () => {}
})

const TabContextProvider = ({children}: Props) => {
    const [editModeActive, setEditModeActive] = useState(false)
    const [tabSize, setTabSize] = useState<TabSize>(0)
    return (
        <TabContext.Provider value={{editModeActive, setEditModeActive, tabSize, setTabSize}}>
            {children}
        </TabContext.Provider>
    )
}

export default TabContextProvider