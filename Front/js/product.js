
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
console.log(fetchProduct());

// ------------faire apparaître le produit
const showProduct = async () => {
    // recuperation du produit dans la promesse fetchproduct
    const product = { ...await fetchProduct(), amount: 1 };
    console.log(product);
    if ("_id" in product) {
        // injection du template
        return productTemplate(product, productwrapper);
    } else {
        return (productwrapper.innerHTML = `Your product doesn't exist`);
    }
};

// ------------contenu html de l'objet
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
            add_button = tempclone.querySelector(".add-btn"),
            select = tempclone.querySelector(".select-option");
        // ajouter du contenu aux variables
        label.innerHTML = "Options :";
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
            console.log(option);
            select.appendChild(option);
        });
        // ajout au panier avec le bouton
        add_button.addEventListener("click", (e) => {
            addItemStorage(product);
            disabledBtn();
            confirmationPopUp(product);
            cartTotal();
            countCart();
            showCart();

        });
        productwrapper.appendChild(tempclone);
    } else {
        return (productwrapper.innerHTML = `<figure class="shadow card col-9 mx-auto p-5" id="product-template">
        <img src="${product.imageUrl}" class="card-img-top" alt="">
        <figcaption>
        <h2 class="card-title">${product.name}</h2>
        <p class="card-text">${product.description}</p>
        <p class="card-price">Prix : ${product.price} €</p>
        <form class="d-flex justify-content-around container my-5">
        <label for="select_option">choisir votre objectif</label>
        <select name="select_option" id="select_option">
        <option>choisir une option</option>
        <option value="option1">${product.lenses[0] ? product.lenses[0] : ""
            }</option>
    <option value="option2">${product.lenses[1] ? product.lenses[1] : ""
            }</option>
<option value="option3">${product.lenses[2] ? product.lenses[2] : ""
            }</option>
</select >
</form>
<button id="add-btn" type="submit" class="btn btn-primary add-panier btn_sm text-light d-block mt-2">Ajouter au panier</button>
</figcaption >
</figure > `);
    }
}
function confirmationPopUp(product) {
    if (
        window.confirm(`${product.name} est ajoutée au panier appuyer sur OK pour
        consulter le panier ou ANNULER pour  rester sur la page`)
    ) {
        window.location.href = "panier.html";
    }
}

// -------------- Event d'apparition de ShowProduct au chargement du DOM
document.addEventListener("DOMContentLoaded", showProduct);

// ------------------------------  LocalStorage -------------------- /


function populateStorage() {
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

// ----------------- Compteur du prix total du panier
function cartTotal() {
    temptotal = 0;
    items = JSON.parse(localStorage.getItem('item'));
    items.map(item => {
        temptotal += item.price * item.amount / 100;
    });
    cart_total = document.querySelector('.cart-total');
    cart_total.innerHTML = parseFloat(temptotal.toFixed(2));
};

// ----------------- desactiver le bouton une fois le produit dans le panier
function disabledBtn() {
    button = document.querySelector(".add-btn");
    button.innerHTML = "votre article est dans le panier";
    button.disabled = true;
}

// ----------------- Compteur du nombre d'elements dans le panier
function countCart() {
    itemtotal = 0;
    items = JSON.parse(localStorage.getItem('item'));
    items.map(item => {
        itemtotal += item.amount;
    });
    cart_count = document.querySelector('#cart');
    cart_count.innerHTML = itemtotal;
}

// ---------------- Affichage des produits dans le panier
function showCart() {
    let items = JSON.parse(localStorage.getItem('item'));
    let table_cart = document.getElementById('cart-items');

    items.forEach((item) => {
        let tr = document.createElement('tr');
        tr.classList.add('cart-item');
        tr.innerHTML = `<td class="px-2"> qté : ${item.amount}</td><td class="px-2">${item.name}</td><td class="px-2">${item.price / 100}€</td><td><button class="remove-btn btn-danger text-light px-2">X</button></td>`;
        table_cart.appendChild(tr);
    });
};

// -------------- Gerer la quantité d'objet dans le localstorage
function setQuantity() {
    let items = JSON.parse(localStorage.getItem('item'));

    if (items != null) {
        items[product._id].amount += 1;
    } else {
        product.amount = 1;
        items = {
            [product._id]: product
        };
    };
};

// -------------- Fonction pour retirer un objet du panier
function clearStorage() {
    clear_btn = document.querySelector('.clear-cart');
    clear_btn.addEventListener("click", (e) => {
        localStorage.clear();
        window.location.reload();
    });
}

// ----------- vider le panier
function clearStorage() {
    localStorage.removeItem('item');
}
