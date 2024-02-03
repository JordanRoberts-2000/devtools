import AddNoteOptions from "./AddNoteOptions"
import defaultFolders from "../../../data/folders.json"
import ExplorerItem from "./ExplorerItem"

const Explorer = ({ }) => {
    console.log(defaultFolders)
    return (
        <>
            <div className="flex-1 relative border-t-2 border-black mx-2 flex flex-col">
                <AddNoteOptions />
                <ul className="flex-1 flex flex-col gap-1 overflow-y-hidden overflow-x-hidden mt-2">
                    {defaultFolders.map(el => <ExplorerItem key={el.id} id={el.id} title={el.title}
                        isFolder={el.isFolder} within_folder_id={el.within_folder_id} />)}
                </ul>
            </div>
        </>
    )
}

export default Explorer