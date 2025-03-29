export declare const createText: (content: string) => Promise<{
    id: string;
    content: string;
    createdAt: Date;
}>;
export declare const getTextById: (id: string) => Promise<{
    id: string;
    content: string;
    createdAt: Date;
}>;
export declare const updateText: (id: string, content: string) => Promise<{
    id: string;
    content: string;
    createdAt: Date;
}>;
export declare const deleteText: (id: string) => Promise<{
    id: string;
    content: string;
    createdAt: Date;
}>;
