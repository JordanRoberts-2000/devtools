import { useState } from "react"
import viewTransition from "../../../../../utils/viewTransition"

type Props = {
    index: number
}

const AddNoteSectionButton = ({ index }: Props) => {
    const [addOptionsVisible, setAddOptionsVisible] = useState(false)
    return (
        <div className="relative h-6">
            <div onMouseEnter={() => viewTransition(() => setAddOptionsVisible(true))} onMouseLeave={() => viewTransition(() => setAddOptionsVisible(false))}
                className="border-2 border-black rounded-md px-2 bg-white flex justify-center items-center absolute left-1/2 
                -translate-x-1/2" style={{ zIndex: 9999 - index }}>
                {!addOptionsVisible ? "+" :
                    <div className=" grid grid-cols-[auto_auto_auto] gap-y-2 gap-x-4 pb-2">
                        <button
                        className="w-8 h-8 flex justify-center items-center border-green-600 border-b-2">
                            T
                        </button>
                        <button className="w-8 h-8 flex justify-center items-center border-green-600 border-b-2">
                            aA
                        </button>
                        <button className="w-8 h-8 flex font-semibold justify-center text-xs items-center border-green-600 border-b-2">
                            &lt;html&gt;
                        </button>
                        <button className="w-8 h-8 flex justify-center items-center border-green-600 border-b-2">
                            <svg className="w-6 h-6 stroke-black" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </button>
                        <button className="w-8 h-8 flex justify-center items-center border-green-600 border-b-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </button>
                        <button className="w-8 h-8 flex text-xs font-semibold justify-center items-center border-green-600 border-b-2">
                            &lt;br&gt;
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default AddNoteSectionButton