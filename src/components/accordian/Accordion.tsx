import "./Accordion.css"

type Props = {
    children: React.ReactNode
}

const Accordion = ({ children }: Props) => {
    return (
        <>
            <div className={"accordion"}>
                <div className="overflow-hidden">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Accordion