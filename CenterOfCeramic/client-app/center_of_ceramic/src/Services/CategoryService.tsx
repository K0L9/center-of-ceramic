import { stringify } from "querystring";
import { getHeapCodeStatistics } from "v8";
import { Category } from "../redux/types/categoryTypes";

import IService from "./IService";

export default class CategoryService implements IService {
    URL_GET: string = "/api/Category/get-all-categories"
    URL_POST: string = "/api/Category/add-category";
    URL_PUT: string = "/api/Category/edit-category";
    URL_DELETE: string = "/api/Category/delete-category";

    async GetCategories() {
        const List = await fetch(this.URL_GET)
            .then(responce => {
                return responce.json();
            }).then(data => {
                if (data == null) {
                    return {
                        List: []
                    }
                } else {
                    return {
                        List: data
                    }
                }
            })
        return List
    }
    async AddCategory(category: Category) {
        fetch(this.URL_POST, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(category)
        });
    }
    async DeleteCategory(id: number) {
        fetch(this.URL_DELETE + "/" + { id }, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: ""
        });
    }
    async EditCategory(id: number, category: Category) {
        fetch(this.URL_PUT + "/" + { id }, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(category)
        });
    }

}