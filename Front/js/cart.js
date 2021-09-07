import * as cartStorage from "./cartStorage.js";

//---------------------------- panier dynamique du bouton de la navigation ------------------------------//
// ----------------- Compteur du prix total du panier
export const cartTotal = () => {
    let temptotal = 0;
    const items = cartStorage.getItem();
    items.map(item => {
        temptotal += item.price * item.amount / 100;
    });

    let cart_total = document.querySelector('.cart-total');
    cart_total.innerHTML = parseFloat(temptotal.toFixed(2));
};

// ----------------- Compteur du nombre d'elements dans le panier
export const countCart = () => {
    let itemtotal = 0;
    const items = cartStorage.getItem();
    items.map(item => {
        itemtotal += item.amount;
    });

    let cart_count = document.querySelector('#cart');
    cart_count.innerHTML = itemtotal;
}
// ---------------- Affichage des produits dans le panier
export const showCart = () => {
    let table_cart = document.getElementById('cart-items');
    const items = cartStorage.getItem();
    // ajout des produits au cart
    items.forEach((item) => {
        let tr = document.createElement('tr');
        tr.classList.add('cart-item');
        tr.innerHTML = `<td class="px-2">${item.amount}x</td><td class="px-2">${item.name}</td><td class="px-2">${item.price / 100}€</td>`;
        table_cart.appendChild(tr);
    });
    countCart();
    cartTotal();
};

document.addEventListener("DOMContentLoaded", showCart);

