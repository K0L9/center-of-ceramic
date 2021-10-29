class countService {
    URL_GET = "/api/Country/get-all-countries"
    URL_ADD = "/api/Country/add-country"
    URL_DELETE = "/api/Country/delete-country"
    URL_EDIT = "/api/Country/edit-country"

    async getCountryList() {
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
    async addCountry(newCateg) {
        let isOk = await fetch(this.URL_ADD, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newCateg)
        }).then(responce => {
            return responce.status === 200;
        })

        return isOk;
    }
    async deleteCountry(index) {
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
    async editCountry(category) {
        fetch(this.URL_EDIT + "/" + category.id, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(category)
        })
    }
}

let countryService = new countService();
export default countryService;