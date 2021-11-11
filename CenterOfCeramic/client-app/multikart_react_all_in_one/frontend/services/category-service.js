class categService {
    URL_GET = "/api/Category/get-all-categories"

    async getAllCategories() {
        let List = await fetch(this.URL_GET)
            .then(response => {
                console.log("RESPONSE: ", response)
                return response.json()
            })
            .then(list => list)

        return List;
    }
}

let categoryService = new categService();
export default categoryService;