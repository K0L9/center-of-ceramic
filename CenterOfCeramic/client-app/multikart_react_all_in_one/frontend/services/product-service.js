class prodService {
    URL_GET = "/api/Product/get-all-products"
    URL_GET_BY_ID = "/api/Product/get-product-by-id"

    getAllProducts = () => {
        let List = fetch(this.URL_GET)
            .then(response => response.json())
            .then(list => {
                return list;
            })

        return List;
    }

    getProductById = (id) => {
        let product = fetch(this.URL_GET_BY_ID + "/" + id)
            .then(response => response.json())
            .then(product => product);

        return product;
    }
}

let productService = new prodService();
export default productService;