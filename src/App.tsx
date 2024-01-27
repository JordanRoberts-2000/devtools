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
            <NotesPage />
        </QueryClientProvider>
    );
}

export default App;
