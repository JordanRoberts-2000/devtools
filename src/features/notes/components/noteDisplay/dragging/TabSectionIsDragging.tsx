import { HTMLAttributes, forwardRef } from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
    title: string
}

const TabSectionIsDragging = forwardRef<HTMLDivElement, Props>(({style, title}, ref) => {
    return (
        <div className="border-2 border-dashed border-red-800 m-2 text-lg font-semibold p-2" ref={ref} style={style}>
            <span className="opacity-0">{title}</span>
        </div>
    )
})

export default TabSectionIsDragging