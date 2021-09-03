// variables
const API_Url = 'http://localhost:3000/api/cameras';
const wrapper = document.getElementById('wrapper');

// fetch APi pour extraire les datas
const fetchCameras = async () => {
    return await fetch(API_Url).then(response => response.json());
};

fetchCameras();

// apparition  des cartes produits sur l'index avec une fonction async utilisant fetch 
const showCameras = async () => {
    const cameras = await fetchCameras();
    wrapper.innerHTML = (
        cameras
            .map(createCamera).join('')
    )
};

// creation des cartes produits en dynamique 
function createCamera(camera) {
    return `<li class="d-flex inline-flex col-xs-12 col-sm-12 col-lg-3 col-md-4 mx-3"><figure class=" shadow card">
    <img src="${camera.imageUrl}" class="card-img-top" alt="">
    <figcaption class="card-body text-xs-right" id="item">
    <h2 class="card-title">${camera.name}</h2>
    <p class=" card-text text-truncate">${camera.description}</p>
    <p class="card-price">Prix : ${camera.price / 100} €</p>
    <div>
    <span>Options: ${camera.lenses}</span>
    </div>
    <a href="product.html?id=${camera._id}" class="btn btn-primary btn-lg add-panier d-block stretched-link">Voir Produit</a>
    </figcaption>
    </figure></li>`
};

// apparition des cartes à partir de l'evenement chargement du contenu du DOM 
document.addEventListener('DOMContentLoaded', showCameras);

//---------------------------- panier dynamique du bouton de la navigation ------------------------------//
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

document.addEventListener("DOMContentLoaded", showCart);
