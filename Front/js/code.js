
const API_Url = 'http://localhost:3000/api/cameras';
let cameras;
const wrapper = document.getElementById('wrapper');

const fetchCameras = async() => {
    const cameras = await fetch(API_Url).then(response => response.json());
    console.log(cameras);
};

fetchCameras();

const showCameras = async() => {
    await fetchCameras();
    wrapper.innerHTML = (
         cameras
            .map(camera => (
            `<figure class=" shadow card col-xs-12 col-sm-12 col-lg-3 col-md-5 mx-2 ">
            <img src= ${camera.imageUrl} class="card-img-top" alt="">
            <figcaption class="card-body text-xs-right" id="item">
            <h2 class="card-title">${camera.name}</h2>
            <p class=" card-text">${camera.description}</p>
            <p class="card-price">${camera.price}</p>
            <div>
            <span>${camera.lenses[0]}</span><span>${camera.lenses[1]}</span><span>${camera.lenses[2]}</span>
            </div>
            <a href="#" class="btn btn-primary btn-lg add-panier d-block" id="add">Ajouter au Panier</a>
            </figcaption>
            </figure>`
            )).join('')
            )
        };
        showCameras();
        /*
        let panier = document.querySelectorAll('.add-to');
        
        for (let i = 0; i < panier.length; i++) {
            panier[i].addEventListener('click', () => {
                itemNumbers(Camera[i]);
            })
        }

function onLoaditemNumbers() {
    let productNumbers = localStorage.getItem('itemNumbers');
    if (productNumbers) {
        document.querySelector('.cart-link span').textContent = productNumbers;
    }
}

function itemNumbers(product) {
    let productNumbers = localStorage.getItem('itemNumbers');
    productNumbers = parseInt(productNumbers);
    
    if (productNumbers) {
        localStorage.setItem('itemNumbers', productNumbers + 1);
        document.querySelector('.cart-link span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('itemNumbers', 1);
        document.querySelector('.cart-link span').textContent = 1;
    }
}

onLoaditemNumbers();

*/

