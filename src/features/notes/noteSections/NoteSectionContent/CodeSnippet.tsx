import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
// import "highlight.js/styles/vs2015.min.css";
import "highlight.js/styles/xcode.min.css";
import { useEffect, useRef } from "react";
// import "highlight.js/styles/vs.min.css";

type Props = {
    code: string,
    className?: string
}

hljs.registerLanguage("javascript", javascript);

const CodeSnippet = ({code, className}: Props) => {
    let codeBlock = useRef<HTMLElement>(null)
    useEffect(() => {
        hljs.highlightElement(codeBlock.current!);;
    },[]);
    return (
        <pre className={className}>
            <code contentEditable ref={codeBlock} className="javascript text-sm !p-0">
                {code}
            </code>
        </pre>
    );
};

export default CodeSnippet;