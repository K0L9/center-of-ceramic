export interface Category {
    id: number
    name: string
    products: any
}

export enum CategoryActionTypes {
    Get = "CategoryGet",
}

export interface CategoryState {
    readonly data: Category[];
}
