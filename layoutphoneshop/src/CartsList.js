import ProducesServices from "./ProduceServices.js";
import CartProduce from "./CartProduce.js";
const producesServices = new ProducesServices();
class CartsList {
    constructor() {
        this.list = [];
        this.number = 0;
    }
    addItem(id) {
        producesServices
            .callAPI(`ProductCapstone/${id}`, "GET",null)
            .then(result => {
                let data = result.data;
                let flagInCart = false;
                this.number++;
                let indexCart = 0;
                for (let index in this.list) {
                    if (this.list[index].id === data.id) {
                        flagInCart = true;
                        indexCart = index;
                        break;
                    }
                }
                
                if (flagInCart) {
                    let quantity = this.list[indexCart].quantity + 1;
                    let addCartProduce = new CartProduce(data.id, data.name, data.price, quantity, data.img);
                    addCartProduce.getTotal();
                    console.log(addCartProduce);
                    this.list[indexCart] = addCartProduce;
                } else {
                    let addNewCartProduce = new CartProduce(data.id, data.name, data.price, 1, data.img);
                    addNewCartProduce.getTotal();
                    this.list.push(addNewCartProduce);
                    console.log(this.list);
                }
                this.setLocalStorage();
            })
            .catch(error => {
                console.log(error);
            })

    }

    addQuantity = index => {
        ++this.list[index].quantity;
        this.number++;
        this.list[index].total = this.list[index].price * this.list[index].quantity;
        this.setLocalStorage();
    }

    minusQuantity = index => {
        --this.list[index].quantity;
        this.number--;
        this.list[index].total = this.list[index].price * this.list[index].quantity;
        if (this.list[index].quantity === 0) {
            this.list.splice(index, 1);
        }
        this.setLocalStorage();
    }

    removeItems = index => {
        this.number -= this.list[index].quantity;
        this.list.splice(index, 1);
        this.setLocalStorage();
        
    }
    clearAll = () => {
        this.list = [];
        this.number = 0;
        this.setLocalStorage();
    }

    layoutCart = () => {
        let total = 0;
        document.getElementById("cart-items").innerHTML = "";
        document.getElementsByClassName("total-qty")[0].innerHTML = this.number;

        this.list.forEach((cart, index) => {
            total += cart.total;
            
             document.getElementById("cart-items").innerHTML  += ` 
            <div class='cart-item'>
                <div class='cart-img'>
                    <img src="${cart.image}" alt='' /> 
                </div>
                <strong class='name'>${cart.name}</strong >
                <span class = 'qty-change'>
                    <div>
                        <button class = 'btn-qty'
                            onclick = "minusQuantity('${index}')"> <i class = 'fas fa-chevron-left' > </i>
                        </button>
                        <p class ='qty'> ${cart.quantity}</p>
                        <button class='btn-qty' onclick="addQuantity('${index}')"><i class='fas fa-chevron-right'></i>
                        </button> 
                    </div> 
                </span>
                <p class="price">$ ${cart.total}</p>  
                <button onclick = "removeItems('${index}')"> 
                <i class = 'fas fa-trash'> </i>
                </button >
            </div>
        `;
        })
        document.getElementsByClassName("total")[0].innerHTML = total;
    }

    setLocalStorage = () => {
        this.layoutCart();
        let cartListJSONString = JSON.stringify(this.list);
        localStorage.setItem("cartList", cartListJSONString);
        
    };
}

export default CartsList;