import ProducesServices from "./ProduceServices.js";
import CartsList from "./CartsList.js";

const getEl = id => document.getElementById(id);
const cartsList = new CartsList();
const producesServices = new ProducesServices();
let number = 0;

//getListProduce
const getListProduce = () => {
    getEl("loader").style.display = "block";
    producesServices
        .callAPI(`ProductCapstone`, "GET", null)
        .then(result => {
            getEl("loader").style.display = "none";
            renderHTML(result.data);
            getLoclStorage();

        })
        .catch(error => {
            getEl("loader").style.display = "none";
            console.log(error);
        })

}
getListProduce();

//HTML render
const renderHTML = listData => {
    if (listData && listData.length > 0) {
        const result = listData.reduce((content, produce,index) => {
            return content += ` 
                    <div class="card">
                        <div class="top-bar">
                            ${produce.type === "iphone" ? '<i class="fab fa-apple"></i>' : '<i class="fa-brands fa-android"></i>'} 
                            <em class="stocks">In Stock</em>
                        </div>
                        <div class="img-container">
                            <img class="product-img"
                                src="${produce.img}"
                                alt="">
                            <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
                        </div>
                        <div class="details">
                            <div class="name-fav">
                                <strong class="product-name">${produce.name}</strong>
                                <button onclick="changeHeart('${index}')" id="heart" class="heart"><i class="fas fa-heart"></i></button>
                            </div>
                            <div class="wrapper">
                                <h5>${produce.desc}</h5>
                                <p>Screen: ${produce.screen}
                                <br>BackCamera: ${produce.backCamera}
                                <br>FontCamera: ${produce.frontCamera}
                                </p>
                            </div>
                            <div class="purchase">
                                <p class="product-price">$ ${produce.price}</p>
                                <span class="btn-add">
                                    <div>
                                        <button onclick="addItem('${produce.id}')" class="add-btn">Add <i
                                                class="fas fa-chevron-right"></i></button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>`;
                  
            }, "");
        getEl("renderProduct").innerHTML = result;
    }
}

function changeHeart(index) {
    const listHearts = document.getElementsByClassName("heart");
    if (listHearts[index].classList.length > 1) {
        listHearts[index].classList.remove("fav");
    } else {
        listHearts[index].classList.add("fav");
    };
};

window.changeHeart = changeHeart;

const sideNav = () => {
    document.getElementsByClassName("purchase-cover")[0].style.display = "block";
    document.getElementsByClassName("side-nav")[0].style.right = "0";
}
window.sideNav = sideNav;


const closeSideNav = () => {
    document.getElementsByClassName("purchase-cover")[0].style.display = "none";
    document.getElementsByClassName("side-nav")[0].style.right = "-100%";
};


window.closeSideNav = closeSideNav;

getEl("selection").addEventListener("change", () => {    
    const selection = getEl("selection").value;
    producesServices
        .callAPI(`ProductCapstone`, "GET", null)
        .then(result => {
            let listFilter = result.data;
            if (selection != "All") {
                listFilter = listFilter.filter(produce => produce.type.toLowerCase() === selection.toLowerCase());
            }
            console.log(listFilter);
            renderHTML(listFilter);
        })
        .catch(error => {
            console.log(error);
        })
})

// const cartProduce = new CartProduce(id,name,price,quantity,img);

// CART OPTIONS
let addQuantity = index => cartsList.addQuantity(index);

window.addQuantity = addQuantity;
let minusQuantity = index => cartsList.minusQuantity(index);
window.minusQuantity = minusQuantity;

let removeItems = index => cartsList.removeItems(index);
window.removeItems = removeItems;



const addItem = id => {
    cartsList.addItem(id);
    // setLocalStorage(cartsList.list);
} 

const getLoclStorage = () => {
    if (localStorage.getItem("cartList")) {
        cartsList.list = JSON.parse(localStorage.getItem("cartList"));
        if (cartsList.list.length === 0) {
            cartsList.number = 0;
        } 
        cartsList.list.forEach((cart, index) => {
            if (index = 0) {
                cartsList.number = cart.quantity;
            } else {
                cartsList.number += cart.quantity;
            }
        })
        console.log(cartsList.layoutCart());
    }


    // const setLocalStorage = (list) => {
    //     let carListJSONString = JSON.stringify(list);
    //     localStorage.setItem("castList", carListJSONString);
    // }

    window.addItem = addItem;

    const clearAll = () => cartsList.clearAll();

    window.clearAll = clearAll


}