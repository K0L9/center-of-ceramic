class prodService {
    URL_GET = "/api/Product/get-all-products"

    getAllProducts = () => {
        let List = fetch(this.URL_GET)
            .then(response => response.json())
            .then(list => {
                console.log("LIST: ", list);
                return list;
            })

        return List;
    }
}

let productService = new prodService();
export default productService;