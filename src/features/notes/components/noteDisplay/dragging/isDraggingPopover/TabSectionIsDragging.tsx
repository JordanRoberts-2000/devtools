import { HTMLAttributes, forwardRef } from "react"

type Props = HTMLAttributes<HTMLDivElement>

const TabSectionIsDragging = forwardRef<HTMLDivElement, Props>(({style}, ref) => {
    return (
        <div className="border-2 border-dashed border-red-800 m-2 h-36" ref={ref} style={style}></div>
    )
})

export default TabSectionIsDragging