import NoteFinder from "../features/notes/components/noteFinder/NoteFinder";
import NoteDisplay from "../features/notes/components/noteDisplay/NoteDisplay";

const NotesPage = ({ }) => {
    return (
        <div className="flex h-screen">
            <NoteFinder/>
            <NoteDisplay/>
        </div>
    )
}

export default NotesPage