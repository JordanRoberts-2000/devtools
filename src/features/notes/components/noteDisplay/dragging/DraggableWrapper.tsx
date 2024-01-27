

type Props = React.HTMLAttributes<HTMLElement> & {
    children: React.ReactNode
}

const DraggableWrapper = ({children, className, ...rest}: Props) => {
    return (
        <div className={className} {...rest}>
            {children}
        </div>
    )
}

export default DraggableWrapper