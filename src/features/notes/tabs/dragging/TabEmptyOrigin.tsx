import { HTMLAttributes, forwardRef } from "react"
import { TabSize } from "../../types"

type Props = HTMLAttributes<HTMLDivElement> & {
    tabSize: TabSize
}

const TabEmptyOrigin = forwardRef<HTMLDivElement, Props>(({style, tabSize}, ref) => {
    return (
        <div style={style} ref={ref}
            className={`border-2 border-red-800 border-dashed bg-white shrink-0 snap-start
            ${tabSize === 0 && "w-1/3"} ${tabSize === 1 && "w-1/2"} ${tabSize === 2 && "w-2/3"}`} />
    )
})

export default TabEmptyOrigin