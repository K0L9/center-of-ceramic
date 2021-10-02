export interface Category {
    Id: number
    Title: string
}

export enum CategoryActionTypes {
    Get = "CategoryGet",
}

export interface CategoryState {
    readonly data: Category[];
}
