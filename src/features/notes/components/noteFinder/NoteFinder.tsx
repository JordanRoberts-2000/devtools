import noteStore from "../../store/notesStore"
import { v4 as uuidv4 } from 'uuid';
import { TabSize } from "../../types";

const NoteFinder = ({ }) => {
    const removeAllTabs = noteStore(state => state.removeAllTabs);
    const addTab = noteStore(state => state.addTab);
    const resetTabSizes = (size: TabSize) => {
        noteStore.setState((state) => {
            if(state.tabs.length < 2)return state
            return { tabs: state.tabs.map(tab => ({ ...tab, size })) }
        })
    }
    return (
        <div className="flex-[2] bg-gray-200">
            <ul className="flex flex-col mb-4">
                <li><button onClick={() => removeAllTabs()} className="border-2 border-black px-2">close all tabs</button></li>
                <li><button onClick={() => addTab(uuidv4())} className="border-2 border-black px-2">add tab</button></li>
                <li><button onClick={() => resetTabSizes(2)} className="border-2 border-black px-2">reset all sizes</button></li>
            </ul>
            <ul>
                <li>id not 0 check</li>
                <li>dragend error handle</li>
                <li>disable drag when just 1??</li>
                <li>prevent overlay from leaving box</li>
                <li>----------------------------------</li>
                <li>default size & reset all sizes to it</li>
                <li>loading / error state</li>
                <li>on dragover, error handling</li>
                <li>sections view transition</li>
                <li>change size of section on hover?</li>
                <li>notes move around</li>
                <li>add sections</li>
                <li>vertical scroll in tabs</li>
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
    )
}

export default NoteFinder