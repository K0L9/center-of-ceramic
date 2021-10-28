class catService {
    URL_GET = "/api/Category/get-all-categories"
    URL_ADD = "/api/Category/add-category"
    URL_DELETE = "/api/Category/delete-category"
    URL_EDIT = "/api/Category/edit-category"

    async getCategoryList() {
        const List = await fetch(this.URL_GET, {
            method: 'get',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(responce => responce.json()).then(data => {
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
    async addCategory(newCateg) {
        fetch(this.URL_ADD, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newCateg)
        })
    }
    async deleteCategory(index) {
        let isOk = await fetch(this.URL_DELETE + "/" + index, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",
        }).then(responce => {
            return responce.status === 200;
        })

        return isOk;
    }
    async editCategory(category) {
        fetch(this.URL_EDIT + "/" + category.id, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(category)
        })
    }
}

let categoryService = new catService();
export default categoryService;