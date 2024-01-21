
type Props = {
    content?: string,
    title?: string
}

const TextSnippet = ({content="", title}: Props) => {
    return (
        <div>
            {title ? <div>{title}</div> : null}
            <div className="inline-block w-full" dangerouslySetInnerHTML={{__html: content}}/>
        </div>
    )
}

export default TextSnippet