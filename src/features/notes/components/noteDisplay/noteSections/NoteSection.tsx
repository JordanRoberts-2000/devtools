type Props = {
    children: React.ReactNode,
    index: number
}

const NoteSection = ({children}: Props) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default NoteSection