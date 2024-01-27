import { HTMLAttributes, forwardRef } from "react"
import { TabSize } from "../../../types"
import clsx from 'clsx'

type Props = HTMLAttributes<HTMLDivElement> & {
    tabSize: TabSize
}

const TabIsDragging = forwardRef<HTMLDivElement, Props>(({style, tabSize}, ref) => {
    const tabClass = clsx(
        'border-2 border-red-800 border-dashed bg-white shrink-0 snap-start', {
        'w-1/3': tabSize === 1,
        'w-1/2': tabSize === 2,
        'w-2/3': tabSize === 3
    });
    return (
        <div style={style} ref={ref} className={tabClass} />
    )
})

export default TabIsDragging