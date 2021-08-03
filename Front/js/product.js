const productwrapper = document.getElementById('product-wrapper');
// fonction pour récuperer l'id
function getProductId() {
    // recuperation de la chaîne de requete dans l'url
    const queryString_url_id = window.location.search;
    // extraire id produit
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    return urlSearchParams.get("id");
};

// recuperation des données de l'objet via l'id dans une promesse
const fetchProduct = async () => {
    const id = getProductId();
    return await fetch(`http://localhost:3000/api/cameras/${id}`).then(response => response.json());
};
console.log(fetchProduct());


// faire apparaître le produit 
const showProduct = async () => {
    // recuperation du produit dans la promesse fetchproduct
    const product = await fetchProduct();
    console.log(product);
    if ("_id" in product) {
        // injection du template 
        return productTemplate(product, productwrapper);
    } else {
        return productwrapper.innerHTML = `Your product doesn't exist`;
    }
};

// contenu html de l'objet
function productTemplate(product, productwrapper) {
    if ('content' in document.createElement('template')) {

        // liées les variables à des selecteurs du template
        let template = document.querySelector("#template");
        let tempclone = document.importNode(template.content, true);
        let name = tempclone.querySelector('.card-title'),
            img = tempclone.querySelector('.card-img-top'),
            description = tempclone.querySelector('.card-text'),
            price = tempclone.querySelector('.card-price'),
            button = tempclone.querySelector('.btn')
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
        name.innerHTML = product.name;
        img.src = product.imageUrl;
        description.innerHTML = product.description;
        price.innerHTML = product.price;
        button.innerHTML = 'Ajouter au panier';

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
            <button id="submit-btn" type="submit" class="btn btn-primary add-panier btn_sm text-light d-block mt-2">Ajouter au panier</button>
            </figcaption >
            </figure > `
    }
};
// Event d'apparition de ShowProduct au chargement du DOM
document.addEventListener('DOMContentLoaded', showProduct);

/*


}




// --------------------Gestion Panier-----------------

//selection id du formulaire
const idSelect = document.querySelectorAll('#select_option');
console.log(idSelect);

// choix utilisateurs dans une constante

const optionUser = idSelect.nodeValue;
console.log(optionUser);

const btn_submit = document.querySelector('#submit-btn');
btn_submit.addEventListener("click", (event) => {
    event.preventDefault()
})
*/