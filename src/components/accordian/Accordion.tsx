import "./Accordion.css"

type Props = {
    children: React.ReactNode,
    active?: boolean
}

const Accordion = ({ children, active }: Props) => {
    return (
        <>
            <div className={`accordion ${active ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}>
                <div className="overflow-hidden grid-rows-[1/span_2] ">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Accordion