import internal from "stream";

import { Photo } from "./Photo"
import { Category } from "./Category"

export type Product = {
    Id: number;
    Price: number;
    Description: string;

    CategoryId: number;

    Photos: Photo[]
    Category: Category
}