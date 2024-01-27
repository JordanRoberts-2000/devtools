// import { useContext, useLayoutEffect, useState } from "react";
// import TextSnippet from "../noteSections/NoteSectionContent/TextSnippet"
// import AddNoteSectionButton from "../noteSections/AddNoteSectionButton";
// // import LineBreak from "../noteSections/NoteSectionContent/LineBreak";
// // import CodeSnippet from "../noteSections/NoteSectionContent/CodeSnippet";
// import { CSS } from '@dnd-kit/utilities';
// import { TabContext } from "../context/TabContextProvider";
// import { NoteSections, TabSectionType } from "../../../types";
// import defaultSectionData from "../../../data/noteSections.json"
// import NoteSection from "../noteSections/NoteSection";
// import { useSortable } from "@dnd-kit/sortable";

// type Props = {
//     tabSectionData: TabSectionType
// }

// const TabSection = ({ tabSectionData }: Props) => {
//     const { id, title, index, fileId } = tabSectionData;
//     const { editModeActive } = useContext(TabContext)
//     const [noteSections, _setNoteSections] = useState<NoteSections[]>(defaultSectionData as NoteSections[]);
//     // const _noteSectionIds = useMemo(() => noteSections.map((section) => section.index), [noteSections])
//     const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
//         id,
//         data: {
//             type: "tabSection",
//             tabSection: {
//                 id,
//                 title,
//                 index,
//                 fileId
//             }
//         }
//     });
//     const style = {
//         transform: CSS.Translate.toString(transform),
//         transition,
//     };
//     if(isDragging)return(
//         <div className="border-2 border-dashed border-red-800 m-2 h-36"  
//         {...attributes} {...listeners} ref={setNodeRef} style={style}></div>
//     )
//     return (
//         <div className="border-2 rounded-md border-gray-900 p-2 m-2 bg-white h-36"
//             {...attributes} {...listeners} ref={setNodeRef} style={style}>
//             <div contentEditable={editModeActive ? "plaintext-only" : false}
//                 className={`${editModeActive && "hover:border-blue-500 border-2 border-transparent"} text-2xl font-semibold`}>
//                 {title}
//             </div>
//             <div>
//                 {noteSections.map((noteSection) => {
//                     switch (noteSection.type) {
//                         case "text":
//                             return (
//                                 <NoteSection key={noteSection.id} index={noteSection.index}>
//                                     <TextSnippet content={noteSection.content} />
//                                 </NoteSection>
//                             )
//                         // case "break":
//                         //     return <LineBreak />
//                         // case "code":
//                         //     return <CodeSnippet code={noteSection.content!} />
//                     }
//                 })}
//             </div>
//             {(editModeActive || !noteSections.length) &&
//                 <div className="flex justify-center">
//                     <AddNoteSectionButton index={index} />
//                 </div>
//             }
//         </div>
//     )
// }

// export default TabSection