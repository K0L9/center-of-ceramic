class catService {
    URL_GET = "/api/Category/get-all-categories"

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
}

let categoryService = new catService;
export default categoryService;