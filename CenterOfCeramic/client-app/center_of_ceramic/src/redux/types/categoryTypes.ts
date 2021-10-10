export interface Category {
    id: number
    name: string
    products: any
}

export enum CategoryActionTypes {
    Get = "CategoryGet",
    Add = "CategoryAdd",
}

export interface CategoryState {
    readonly data: Category[];
    readonly currentCategory: Category;
}
