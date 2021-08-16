// variables
const API_Url = 'http://localhost:3000/api/cameras';
let cameras;
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
    console.log(cameras)
};

// creation des cartes produits en dynamique 
function createCamera(camera) {
    return `<figure class=" shadow card col-xs-12 col-sm-12 col-lg-3 col-md-5 mx-2 ">
    <img src="${camera.imageUrl}" class="card-img-top" alt="">
    <figcaption class="card-body text-xs-right" id="item">
    <h2 class="card-title">${camera.name}</h2>
    <p class=" card-text text-truncate">${camera.description}</p>
    <p class="card-price">Prix : ${camera.price / 100} €</p>
    <div>
    <span>${camera.lenses}</span>
    </div>
    <a href="product.html?id=${camera._id}" class="btn btn-primary btn-lg add-panier d-block stretched-link">Voir Produit</a>
    </figcaption>
    </figure>`
};

// apparition des cartes à partir de l'evenement chargement du contenu du DOM 
document.addEventListener('DOMContentLoaded', showCameras);



