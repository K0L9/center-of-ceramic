import { NumberLiteralType } from "typescript"
import { Product } from "./Product"

export type Photo = {
    Id: number;
    URL: string;

    ProductId: number;
    Product: Product;
}