export type NoteSections = {
    id: number,
    index: number,
    type: "code" | "text" | "list" | "image" | "title" | "break",
    content?: string
}

export type TabSectionType = {
    id: number,
    fileId: number,
    index: number,
    title: string
}

export type TabSize = 0 | 1 | 2

export type TabType = {
    id: number | string,
    title: string,
    size: TabSize
}