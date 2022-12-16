class CartProduce {
    constructor(_id, _name, _price, _quantity, _image) {
        this.id = _id;
        this.name = _name;
        this.price = parseInt(_price);
        this.quantity = _quantity;
        this.image = _image;
        this.total = 0;

        };
    getTotal = () => {
        this.total = this.quantity * this.price;
    }
}

export default CartProduce;