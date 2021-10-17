class categoryService {
    URL_GET = "/"

    async getCategoryList() {
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
}

let categoryService = new categoryService;
export default categoryService;