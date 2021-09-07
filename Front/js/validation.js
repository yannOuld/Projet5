import * as cartStorage from './cartStorage.js';
// ------------ Prix de la commande
function priceValidation() {
    let total = 0;
    const items = cartStorage.getItem();
    items.map(item => {
        total += item.price * item.amount / 100;
    })
    let validationPrice = document.getElementById('commande-price');
    validationPrice.innerHTML = parseInt(total);
}

// ------------ recuperation de l'id de commande et injection html
function orderValidation() {
    let commande = JSON.parse(localStorage.getItem('commande'));
    let orderNumber = document.getElementById('order-identifiant');
    orderNumber.innerHTML = commande.orderId;
}


function order66() {
    priceValidation();
    orderValidation();
}

document.addEventListener('DOMContentLoaded', order66)