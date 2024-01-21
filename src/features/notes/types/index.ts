export type NoteSections = {
    id: number,
    index: number,
    type: "code" | "text" | "list" | "image" | "title" | "break",
    content?: string
}

export type TabSections = {
    id: number,
    index: number,
    title: string
}

export type TabSize = 0 | 1 | 2

export type TabType = {
    id: number,
    title: string
    dimensions?: {
        width: number,
        height: number
    }
}