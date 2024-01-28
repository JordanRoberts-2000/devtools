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
        <div className="flex-[2] bg-gray-200 h-screen overflow-y-auto z-20">
            <ul className="flex flex-col mb-4">
                <li><button onClick={() => removeAllTabs()} className="border-2 border-black px-2">close all tabs</button></li>
                <li><button onClick={() => addTab(uuidv4())} className="border-2 border-black px-2">add tab</button></li>
                <li><button onClick={() => resetTabSizes(2)} className="border-2 border-black px-2">reset all sizes</button></li>
            </ul>
            <ul>
                <li>zustand subscribe, transient updates</li>
                <li>immer?</li>
                <li>only letters and numbers title</li>
                <li>----------------------------------</li>
                <li>sections title edit</li>
                <li>edit state seperate</li>
                <li>index edit/save/order</li>
                <li>revert to old state</li>
                <li>tab has changes to save?</li>
                <li>----------------------------------</li>
                <li>stop snap-x while dragging</li>
                <li>snap x off atm turn on</li>
                <li>create/fix own swap functions</li>
                <li>0 id check, change to uuid</li>
                <li>disable drag when just 1??</li>
                <li>add to empty tab</li>
                <li>draggable wrapper on section</li>
                <li>memoize tab sections</li>
                <li className="mb-2">dif size hover, el to mouse</li>
                <li><strong>Goal</strong>: all sections</li>
                <li>dont rerender on switch</li>
                <li>----------------------------------</li>
                <li>add sections</li>
                <li>change tab title</li>
                <li>change section title</li>
                <li>editable mode?</li>
                <li>sort by index once</li>
                <li>blur mode</li>
                <li>----------------------------------</li>
                <li>when 0 tabs what?</li>
                <li>custom smoove autoscroll while dragging</li>
                <li>pr-12 is causing shift</li>
                <li>draggable overlay content from cache</li>
                <li>border of isDragging, small shift</li>
                <li>code split</li>
                <li>1 tab - all sections on left</li>
                <li>loading / error state</li>
                <li>drag, error handling</li>
                <li>sections view transition</li>
                <li>notes move around</li>
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