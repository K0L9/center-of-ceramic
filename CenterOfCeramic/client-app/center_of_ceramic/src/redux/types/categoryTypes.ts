export interface Category {
    id: number
    name: string
    products: any
}

export enum CategoryActionTypes {
    Get = "CategoryGet",
    Add = "CategoryAdd",
    Delete = "CategoryDelete"
}

export interface CategoryState {
    readonly data: Category[];
    readonly currentCategory: Category;
}
