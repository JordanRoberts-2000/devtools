import { useContext, useId, useMemo, useState } from "react";
import TextSnippet from "../noteSections/NoteSectionContent/TextSnippet"
import AddNoteSectionButton from "../noteSections/AddNoteSectionButton";
import LineBreak from "../noteSections/NoteSectionContent/LineBreak";
import CodeSnippet from "../noteSections/NoteSectionContent/CodeSnippet";
import { TabContext } from "../context/TabContextProvider";
import { NoteSections } from "../types";
import defaultSectionData from "../data/noteSections.json"
import NoteSection from "../noteSections/NoteSection";

const TabSection = ({ index, title }: { index: number, title: string }) => {
    const { editModeActive } = useContext(TabContext)
    const id = useId()
    const [noteSections, setNoteSections] = useState<NoteSections[]>(defaultSectionData as NoteSections[]);
    const noteSectionIds = useMemo(() => noteSections.map((section) => section.index), [noteSections])

    return (
        <div className="border-2 rounded-md border-gray-900 p-2 m-2">
            <div contentEditable={editModeActive ? "plaintext-only" : false}
                className={`${editModeActive && "hover:border-blue-500 border-2 border-transparent"} text-2xl font-semibold`}>
                {title}
            </div>
            <div>
                    {noteSections.map((noteSection) => {
                        switch (noteSection.type) {
                            case "text":
                                return (
                                    <NoteSection key={noteSection.id} index={noteSection.index}>
                                        <TextSnippet content={noteSection.content} />
                                    </NoteSection>
                                )
                            // case "break":
                            //     return <LineBreak />
                            // case "code":
                            //     return <CodeSnippet code={noteSection.content!} />
                        }
                    })}
            </div>
            {(editModeActive || !noteSections.length) &&
                <div className="flex justify-center">
                    <AddNoteSectionButton index={index} />
                </div>
            }
        </div>
    )
}

export default TabSection