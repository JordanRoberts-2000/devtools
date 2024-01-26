// import { invoke } from "@tauri-apps/api/tauri";
import { QueryClient, QueryClientProvider } from 'react-query'
import NotesPage from "./pages/NotesPage";

const queryClient = new QueryClient()

function App() {

    //   async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //     setGreetMsg(await invoke("greet", { name }));
    //   }

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex h-screen">
                <div className="flex-[2] bg-gray-200">
                    <ul>
                        <li>memoize</li>
                        <li>loading / error state</li>
                        <li>on dragover, error handling</li>
                        <li>tab swapping size error</li>
                        <li>active in drag can retreive height/width</li>
                        <li>move drag logic to seperate file</li>
                        <li>prevent overlay from leaving box</li>
                        <li>removing padding depending on size??</li>
                        <li>overlay size adjust on resize</li>
                        <li>close tabs</li>
                        <li>sections view transition</li>
                        <li>change size of section on hover?</li>
                        <li>notes move around</li>
                        <li>add sections</li>
                        <li>vertical scroll in tabs</li>
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
                <NotesPage />
            </div>
        </QueryClientProvider>
    );
}

export default App;
