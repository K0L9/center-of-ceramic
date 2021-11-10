class reviService {
    URL_ADD = "/api/Review/add-review"

    async addReview(newReview) {
        let isOk = await fetch(this.URL_ADD, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newReview)
        }).then(responce => {
            return responce.status === 200;
        })

        return isOk;
    }
}

let reviewService = new reviService();
export default reviewService;