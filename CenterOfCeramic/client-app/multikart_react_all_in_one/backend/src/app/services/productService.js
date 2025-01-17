class prodService {
    URL_GET = "/api/Product/get-all-products"
    URL_ADD = "/api/Product/add-product"
    URL_DELETE = "/api/Product/delete-product"
    URL_EDIT = "/api/Product/edit-product"

    async getProductList() {
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
    async addProduct(newProduct) {
        let isOk = await fetch(this.URL_ADD, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newProduct)
        }).then(responce => {
            return responce.status === 200;
        })

        return isOk;
    }
    async deleteProduct(index) {
        let isOk = await fetch(this.URL_DELETE + "/" + index, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",
        }).then(responce => {
            return responce.status === 200;
        });

        return isOk;
    }
    async editProduct(product) {
        let isOk = await fetch(this.URL_EDIT + "/" + product.id, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(product)
        }).then(responce => {
            return responce.status === 200;
        });

        return isOk;
    }
}

let productService = new prodService();
export default productService;