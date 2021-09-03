// ----------------- Compteur du prix total du panier
const cartTotal = () => {
    temptotal = 0;
    items = JSON.parse(localStorage.getItem('item'));
    items.map(item => {
        temptotal += item.price * item.amount / 100;
    });
    cart_total = document.querySelector('.cart-total');
    cart_total.innerHTML = parseFloat(temptotal.toFixed(2));
};

// ----------------- Compteur du nombre d'elements dans le panier
const countCart = () => {
    itemtotal = 0;
    items = JSON.parse(localStorage.getItem('item'));
    items.map(item => {
        itemtotal += item.amount;
    });
    cart_count = document.querySelector('#cart');
    cart_count.innerHTML = itemtotal;
}

// ---------------- Affichage des produits dans le panier
const showCart = () => {
    let items = JSON.parse(localStorage.getItem('item'));
    let table_cart = document.getElementById('cart-items');
    let clear_btn = document.querySelector('.clear-cart');
    // ajout des produits au cart
    items.forEach((item) => {
        let tr = document.createElement('tr');
        tr.classList.add('cart-item');
        tr.innerHTML = `<td class="px-2"> ${item.amount}x</td><td class="px-2">${item.name}</td><td class="px-2">${item.price / 100}€</td>`;
        table_cart.appendChild(tr);
    });
    countCart();
    cartTotal();

};
export { cartTotal };
export { countCart };
export { showCart };