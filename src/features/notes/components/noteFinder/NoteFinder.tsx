import noteStore from "../../store/notesStore"
import { TabSize } from "../../types";
import Explorer from "./explorer/Explorer";

const NoteFinder = ({ }) => {
    const removeAllTabs = noteStore(state => state.removeAllTabs);
    const addTab = noteStore(state => state.addTab);
    const setAllTabsTitleMode = noteStore(state => state.setAllTabsTitleMode)
    const resetTabSizes = (size: TabSize) => {
        noteStore.setState((state) => {
            if (state.tabs.length < 2) return state
            return { tabs: state.tabs.map(tab => ({ ...tab, size })) }
        })
    }
    return (
        <div className="flex-[2] h-screen z-20 flex flex-col">
            <button onClick={() => addTab()} className="border-2 border-black w-fit">temp add tab</button>
            <div className="relative m-2">
                <svg className="w-5 h-5 fill-blue-500 absolute left-2 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
                </svg>
                <input type="text" placeholder={"search"}
                      className="border-2 pr-2 pl-8 py-1 rounded-md text-sm w-full text-gray-500"/>
            </div>
            <ul className="flex w-full text-sm mb-1 ml-2 gap-2">
                <li><button onClick={() => removeAllTabs()} className="border whitespace-nowrap flex rounded-sm px-1">close all</button></li>
                <li><button onClick={() => resetTabSizes(2)} className="border whitespace-nowrap rounded-sm px-1">save all</button></li>
                <li><button className="border whitespace-nowrap rounded-sm px-1">disable multiple tabs</button></li>
            </ul>
            <ul className="text-sm ml-2 mb-1 flex gap-1">
                <li><button className="border whitespace-nowrap rounded-sm px-2">resize all to default</button></li>
                <li><button className="border whitespace-nowrap rounded-sm px-2">bookmarked</button></li>
            </ul>
            <Explorer />
        </div>
    )
}

export default NoteFinder