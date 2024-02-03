import { ExplorerItemType } from "../../../types"

const ExplorerItem = ({ title, id, within_folder_id, isFolder }: ExplorerItemType) => {
    return (
        <li className="flex flex-col h-5 flex-shrink-0 ">
            <div className="flex items-center">
                <div className="h-5 w-[3px] bg-blue-500" />
                <svg className="h-4 w-4 mx-2 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z"/></svg>
                {/* <svg className="h-4 w-4 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg> */}
                <div className="max-w-[26ch] font-semibold text-sm text-ellipsis overflow-hidden whitespace-nowrap">{title}</div>
            </div>
        </li>
    )
}

export default ExplorerItem