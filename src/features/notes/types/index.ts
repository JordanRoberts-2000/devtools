export type NoteSections = {
    id: number,
    index: number,
    type: "code" | "text" | "list" | "image" | "title" | "break",
    content?: string
}

export type TabSectionType = {
    id: number | string,
    fileId: number | string,
    index?: number,
    title: string
}

export type DraggingTabSection = Omit<TabSectionType, "index"> & {
    xy: { x: number | null; y: number | null };
};

export type TabSize = 1 | 2 | 3

export type TabType = {
    id: number | string,
    title: string,
    size: TabSize
}