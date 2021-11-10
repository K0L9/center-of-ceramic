class prodService {
    URL_GET = "/api/Product/get-all-products"
    URL_GET_BY_ID = "/api/Product/get-product-by-id"
    URL_GET_RELATED = "/api/Product/get-related-product"
    URL_GET_NEw = "/api/Product/get-new-products"

    async getAllProducts() {
        let List = await fetch(this.URL_GET)
            .then(response => response.json())
            .then(list => {
                return list;
            })

        return List;
    }

    async getProductById(id) {
        let product = await fetch(this.URL_GET_BY_ID + "/" + id)
            .then(response => response.json())
            .then(product => product);

        return product;
    }

    async getRelatedProduct(id) {
        let products = await fetch(this.URL_GET_RELATED + "/" + id)
            .then(response => response.json())
            .then(products => products);

        return products;
    }

    async getNewProducts() {
        let products = await fetch(this.URL_GET_NEw)
            .then(response => response.json())
            .then(products => products);

        return products;
    }
}

let productService = new prodService();
export default productService;