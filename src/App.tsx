// import { invoke } from "@tauri-apps/api/tauri";

function App() {

    //   async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //     setGreetMsg(await invoke("greet", { name }));
    //   }
    const test = 'hello<span class="text-pink-500">hello</span>'

    return (
        <div contentEditable className=" m-12 border-black border-2" dangerouslySetInnerHTML={{ __html: test}}/>
    );
}

export default App;
