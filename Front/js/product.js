
const productwrapper = document.getElementById("product-wrapper");

// ------------fonction pour récuperer l'id
function getProductId() {
    // recuperation de la chaîne de requete dans l'url
    const queryString_url_id = window.location.search;
    // extraire id produit
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    return urlSearchParams.get("id");
}

// -------------recuperation des données de l'objet via l'id dans une promesse
const fetchProduct = async () => {
    const id = getProductId();
    return await fetch(`http://localhost:3000/api/cameras/${id}`).then(
        (response) => response.json()
    );
};

// ------------faire apparaître le produit
const showProduct = async () => {
    // recuperation du produit dans la promesse fetchproduct
    const product = { ...await fetchProduct(), amount: 1 };
    if ("_id" in product) {
        // injection du template
        return productTemplate(product, productwrapper);
    } else {
        return (productwrapper.innerHTML = `Your product doesn't exist`);
    }
};

// ------------ Template pour l'affichage du produit 
function productTemplate(product, productwrapper) {
    if ("content" in document.createElement("template")) {
        // liées les variables à des selecteurs du template
        let template = document.querySelector("#template");
        let tempclone = document.importNode(template.content, true);
        let name = tempclone.querySelector(".card-title"),
            img = tempclone.querySelector(".card-img-top"),
            description = tempclone.querySelector(".card-text"),
            price = tempclone.querySelector(".card-price"),
            label = tempclone.querySelector(".label"),
            label_qte = tempclone.querySelector(".label-qte"),
            option_qte = tempclone.querySelector(".option-qte"),
            add_button = tempclone.querySelector(".add-btn"),
            select = tempclone.querySelector(".select-option"),
            select_qte = tempclone.querySelector(".select-qte");
        // ajouter du contenu aux variables
        label.innerHTML = "Options :";
        label_qte.innerHTML = "Quantité :";
        option_qte.innerHTML = product.amount
        name.innerHTML = product.name;
        img.src = product.imageUrl;
        description.innerHTML = product.description;
        price.innerHTML = `Price :  ${product.price / 100}  €`;
        add_button.innerHTML = "Ajouter au panier";
        //iteration des options du produit
        product.lenses.forEach((lense) => {
            option = document.createElement("option");
            option.innerHTML = lense;
            option.value = lense;
            select.appendChild(option);
        });
        // ajout au panier avec le bouton
        add_button.addEventListener("click", (e) => {
            populateStorage(product);
        });
        productwrapper.appendChild(tempclone);
    } else {
        return (productwrapper.innerHTML = `Désolée votre navigateur ne prends pas en charge le site internet ! `);
    }
};

// ------------------------------  LocalStorage -------------------- /

// -------------- fonction pour l'evenement du bouton ajouter au panier 
function populateStorage(product) {
    addItemStorage(product);
    window.location.reload();
    confirmationPopUp(product);
    disabledBtn();
}

// ----------------- fenetre de confirmation du produit dans le panier
function confirmationPopUp(product) {
    if (
        window.confirm(`${product.name} est ajoutée au panier ! Voulez vous retourner a la page d'accueiil ?`)
    ) {
        window.location.href = "index.html";
    }
}

// ----------------- Ajouter des item au localStorage
function addItemStorage(product) {
    let storage = JSON.parse(localStorage.getItem("item"));

    if (!storage) {
        storage = [];
    }
    storage.push(product);
    localStorage.setItem("item", JSON.stringify(storage));
    console.log(storage);
}

// ----------------- desactiver le bouton une fois le produit dans le panier
function disabledBtn() {
    button = document.querySelector(".add-btn");
    button.innerHTML = "votre article est dans le panier";
    button.disabled = true;
}


// -------------- Gerer la quantité d'objet dans le localstorage
function setQuantity() {
    let items = JSON.parse(localStorage.getItem('item')) || [];

    const item = items.find(item => product._id = item._id);

    if (item == false) {
        item = product
        items.push(item)
    } else {
        item.amount += 1;
    };
    localStorage.setItem('item', JSON.stringify(item))
};

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

// -------------- Event d'apparition au chargement du DOM
document.addEventListener("DOMContentLoaded", showProduct);
document.addEventListener("DOMContentLoaded", showCart);