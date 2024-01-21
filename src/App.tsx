// import { invoke } from "@tauri-apps/api/tauri";

import NotesPage from "./pages/NotesPage";

function App() {

    //   async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //     setGreetMsg(await invoke("greet", { name }));
    //   }

    return (
        <div className="flex h-screen">
            <div className="flex-[2] bg-gray-200">
                <ul>
                    <li>removing padding depending on size??</li>
                    <li>overlay size adjust on resize</li>
                    <li>close tabs</li>
                    <li>sections move around</li>
                    <li>notes move around</li>
                    <li>add sections</li>
                    <li>make pinch to zoom tighter</li>
                    <li>vertical scroll snap on sections</li>
                    <li>add notes</li>
                    <li>note, code, br, list</li>
                    <li>delete notes, sections, are you sure?</li>
                    <li>custom context menu, subtitle</li>
                    <li>read more/show example</li>
                    <li>bold, italic, underline, quote, link</li>
                    <li>image and excal</li>
                </ul>
            </div>
            <NotesPage/>
        </div>
    );
}

export default App;
