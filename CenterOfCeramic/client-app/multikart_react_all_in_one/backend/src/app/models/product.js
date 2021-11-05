export class Product {

    constructor(id, title, price, description, categoryId, countryId, quantity, oldPrice, variants, isSale = false) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.categoryId = categoryId;
        this.countryId = countryId;
        this.quantity = quantity;
        this.isSale = isSale;
        this.oldPrice = oldPrice;
        this.variants = variants;
    }
}