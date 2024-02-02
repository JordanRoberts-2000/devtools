import { forwardRef } from "react"

type Props = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
}

const DraggableWrapper = forwardRef<HTMLDivElement, Props>(({children, className, ...rest}, ref) => {
    return (
        <div className={className} {...rest} ref={ref}>
            {children}
        </div>
    )
})

export default DraggableWrapper