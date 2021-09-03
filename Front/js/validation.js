// ------------ Prix de la commande
function priceValidation() {
    total = 0;
    items = JSON.parse(localStorage.getItem('item'));
    items.map(item => {
        total += item.price * item.amount / 100;
    })

    let validationPrice = document.getElementById('commande-price');
    validationPrice.innerHTML = parseInt(total);
}

// ------------ recuperation de l'id de commande et injection html
function orderValidation() {
    commande = JSON.parse(localStorage.getItem('commande'));
    orderNumber = document.getElementById('order-identifiant');
    orderNumber.innerHTML = commande.orderId;
}


function Order() {
    priceValidation();
    orderValidation();
}

document.addEventListener('DOMContentLoaded', Order)