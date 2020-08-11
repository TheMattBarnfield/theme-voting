export interface Theme {
    theme: string;
    likes: number;
    dislikes: number;
    uids: string[];
}

export interface ThemeResponse {
    id: string;
    theme: string;
}

export interface ThemeId {
    id: string;
}
