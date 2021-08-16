dropDownPanier();
const productwrapper = document.getElementById('product-wrapper');


// ------------fonction pour récuperer l'id
function getProductId() {
    // recuperation de la chaîne de requete dans l'url
    const queryString_url_id = window.location.search;
    // extraire id produit
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    return urlSearchParams.get("id");
};


// -------------recuperation des données de l'objet via l'id dans une promesse
const fetchProduct = async () => {
    const id = getProductId();
    return await fetch(`http://localhost:3000/api/cameras/${id}`).then(response => response.json());
};
console.log(fetchProduct());


// ------------faire apparaître le produit 
const showProduct = async () => {
    // recuperation du produit dans la promesse fetchproduct
    const product = await fetchProduct();
    console.log(product);
    if ("_id" in product) {
        // injection du template 
        return productTemplate(product, productwrapper);
    } else {
        return productwrapper.innerHTML = `Your product doesn't exist`;
    };
};


// ------------contenu html de l'objet
function productTemplate(product, productwrapper) {
    if ('content' in document.createElement('template')) {

        // liées les variables à des selecteurs du template
        let template = document.querySelector("#template");
        let tempclone = document.importNode(template.content, true);
        let name = tempclone.querySelector('.card-title'),
            img = tempclone.querySelector('.card-img-top'),
            description = tempclone.querySelector('.card-text'),
            price = tempclone.querySelector('.card-price'),
            label = tempclone.querySelector('.label'),
            add_button = tempclone.querySelector('.add-btn'),
            select = tempclone.querySelector('.select-option');
        // ajouter du contenu aux variables 
        //iteration des option du produit 
        product.lenses.forEach(lense => {
            option = document.createElement('option');
            option.innerHTML = lense;
            option.value = lense;
            console.log(option);
            select.appendChild(option);
        });
        label.innerHTML = 'Options :';
        name.innerHTML = product.name;
        img.src = product.imageUrl;
        description.innerHTML = product.description;
        price.innerHTML = `Price :  ${product.price / 100}  €`;
        add_button.innerHTML = 'Ajouter au panier';
        // ajout au panier avec le bouton  

        add_button.addEventListener("click", (e) => {
            addItemStorage(product);
            dropDownPanier();
            disabledBtn();
            confirmationPopUp(product);
            removeItem(product);
            countCart(product);
        })
        productwrapper.appendChild(tempclone);
    } else {
        return productwrapper.innerHTML = `<figure class="shadow card col-9 mx-auto p-5" id="product-template">
        <img src="${product.imageUrl}" class="card-img-top" alt="">
        <figcaption>
        <h2 class="card-title">${product.name}</h2>
        <p class="card-text">${product.description}</p>
        <p class="card-price">Prix : ${product.price} €</p>
        <form class="d-flex justify-content-around container my-5">
        <label for="select_option">choisir votre objectif</label>
        <select name="select_option" id="select_option">
        <option>choisir une option</option>
        <option value="option1">${product.lenses[0] ? product.lenses[0] : ''}</option>
        <option value="option2">${product.lenses[1] ? product.lenses[1] : ''}</option>
        <option value="option3">${product.lenses[2] ? product.lenses[2] : ''}</option>
        </select >
        </form>
        <button id="add-btn" type="submit" class="btn btn-primary add-panier btn_sm text-light d-block mt-2">Ajouter au panier</button>
        </figcaption >
        </figure > `
    }
};


// --------------Event d'apparition de ShowProduct au chargement du DOM
document.addEventListener('DOMContentLoaded', showProduct);

/*
// ------------------------------Panier LocalStorage--------------------
const btn = document.querySelector('#submit-btn');
}
*/
function confirmationPopUp(product) {
    if (window.confirm(`${product.name} est ajoutée au panier appuyer sur OK pour
    consulter le panier ou ANNULER pour  rester sur la page`)) {
        window.location.href = "panier.html";
    }
}

function populateStorage() {
    itemStorage();

}

function addItemStorage(product) {
    let storage = JSON.parse(localStorage.getItem(product._id));
    selected_product = localStorage.setItem(product._id, JSON.stringify(product));
    console.log(product._id);
    if (storage === undefined) {
        storage = [];
        storage.push(selected_product);
        console.log(storage)
    }
}

function totalPrice() {
    let cartItem = document.querySelector()
}

function disabledBtn() {
    button = document.querySelector('.add-btn');
    button.innerHTML = 'votre article est dans le panier';
    button.disabled = true;
}
function countCart(product) {
    let cartNumbers = 0;
    let items = JSON.parse(localStorage.getItem(product._id));
    for (let i = 0, len = localStorage.length; i < len; i++) {
        localStorage.getItem(localStorage.key(i));
        cartNumbers++;
    };
    let cartCount = document.getElementById('cart');
    cartCount.textContent = cartNumbers;
}
/*
// ------------- Compteur panier
    // selection de la span contenant le compteur
    let add_btn = document.querySelector('.add-btn');
    // iteration pour l'addEventListener et mise en place du compteur dans le localStorage
    for (let i = 0; i < add_btn.lenght; i++) {
        add_btn[i].addEventListener('click', () => {
            let countNumber = localStorage.getItem('count');
            countNumber = parseInt(countNumber);
            if (countNumber) {
                localStorage.setItem('count', countNumber + 1);
                cartCount.innerHTML = countNumber + 1;
            } else {
                localStorage.setItem('count', 1);
                cartCount.innerHTML = cartCount = 1;
            }
        })
    countCart();
}
*/

// ------------ Affichage du compteur panier


// ---------------- Affichage dropdown list panier

function dropDownPanier() {
    let dropdownlist = document.querySelector('#dropdownlist');
    let msg_panier = document.getElementById('itempanier');
    if (localStorage.length > 0) {
        msg_panier.innerHTML = '<p class="p-2">votre panier :</p>';
        for (let i = 0, len = localStorage.length; i < len; i++) {
            localStorage.getItem(localStorage.key(i));
            item = JSON.parse(localStorage.getItem(localStorage.key(i)));
            console.log(item);
            dropdownlist.innerHTML += '<table><tr><td class="px-2">QTÉ: 1x </td></tr><tr><td class="px-2">' + item.name + '</td><td class="px-2"> ' + item.price / 100 + '€</td><td><button class="remove-btn btn-danger text-light px-2">X</button></td></tr></table>';
        }
    } else {
        msg_panier.innerHTML = '<p class="px-2">aucun produit dans votre panier</p>';
    }
};

// -------------- Fonction pour retirer un objet du panier 

function removeItem(product) {
    remove_btn = document.querySelector('.remove-btn');
    remove_btn.addEventListener('click', (e) => {
        localStorage.removeItem(product._id);
    })
};

// ----------- vider le panier 
function clearStorage() {
    localStorage.clear();
};

