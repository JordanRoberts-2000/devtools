// import { invoke } from "@tauri-apps/api/tauri";
import { QueryClient, QueryClientProvider } from 'react-query'
import NotesPage from "./pages/NotesPage";

const queryClient = new QueryClient()
import Database from "tauri-plugin-sql-api";

function App() {
    const SQLiteLoad = async () => {
        const db = await Database.load("sqlite:test.db");
        // await db.execute(`DROP TABLE IF EXISTS explorerItems`)
        // const result = await db.execute(`
        //     CREATE TABLE IF NOT EXISTS explorerItems (
        //         id INTEGER PRIMARY KEY AUTOINCREMENT,
        //         title TEXT,
        //         isFolder BOOLEAN,
        //         within_folder_id INTEGER
        //     )
        // `);
        // const oop = await db.execute(`INSERT INTO explorerItems (title, isFolder, within_folder_id) VALUES ("Databases", true, 0)`)
        const selected: any[] = await db.select(`SELECT * FROM explorerItems`)
        // Step 3: Close the database connection
        const success = await db.close();
        console.log(selected)
        // console.log(success, result, selected, oop)
    }
    SQLiteLoad()
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
