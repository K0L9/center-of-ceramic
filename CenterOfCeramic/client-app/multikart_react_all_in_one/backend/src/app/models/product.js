export class Product {

    constructor(id, title, price, description, categoryId, countryId, images, quantity, oldPrice, isSale = false) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.categoryId = categoryId;
        this.countryId = countryId;
        this.images = images;
        this.quantity = quantity;
        this.isSale = isSale;
        this.oldPrice = oldPrice;
    }
}