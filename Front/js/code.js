class Camera {
    constructor(lenses, _id, name, price, description, imageUrl) {
        this.lenses = lenses,
        this._id = _id,
        this.name = name,
        this.price = price,
        this.description = description,
        this.imageUrl = imageUrl
    }
};

let firstCamera = new Camera(["35mm 1.4","50mm 1.6"],"5be1ed3f1c9d44000030b061","Zurss 50S","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",49900,"vcam_1.jpg");
let secondCamera = new Camera(["50mm 1.8","60mm 2.8","24-60mm 2.8/4.5"],"5be1ef211c9d44000030b062","Hirsch 400DTS","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",309900,"vcam_2.jpg");
let thirdCamera = new Camera(["25mm 4.5"],"5be9bc241c9d440000a730e7","Franck JS 105","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",209900,"vcam_3.jpg");
let fourthCamera = new Camera(["50mm 1.7","35mm 1.4"],"5be9c4471c9d440000a730e8","Kuros TTS","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",159900,"vcam_4.jpg");
let fifthCamera = new Camera(["50mm 1.4","35mm 1.8","28-200mm 2.8/4.5"],"5be9c4c71c9d440000a730e9","Katatone","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",59900,"vcam_5.jpg")

let cameras = [];
cameras.push(firstCamera, secondCamera, thirdCamera, fourthCamera, fifthCamera);


function populateCard() {
let productCard = '';
cameras.forEach(cam => productCard += `
              <img src= ${cam.imageUrl} class="card-img-top" alt="">
              <figcaption class="card-body text-xs-right" id="item">
                  <h2 class="card-title">${cam.name}</h2>
                  <p class=" card-text">${cam.description}</p>
                  <p class="card-price">${cam.price}</p>
                  <div>
                  <span>${cam.lenses[0]}</span><span>${cam.lenses[1]}</span><span>${cam.lenses[2]}</span>
                  </div>
                  <a href="#" class="btn btn-primary btn-lg add-panier d-block" id="add">Ajouter au Panier</a>
                </figcaption>
          `)
}
populateCard();
document.getElementsByClassName('card').innerHtml = productCard;


let addPanier = document.querySelectorAll('.add-panier');

for (let i=0; i < addPanier.length; i++) {
    addPanier[i].addEventListener('click' , () => {
        itemNumbers(Camera[i]);
    })
}

function onLoaditemNumbers() {
    let productNumbers = localStorage.getItem('itemNumbers');
    if(productNumbers) {
        document.querySelector('.cart-link span').textContent = productNumbers;
    }
}

function itemNumbers(product) {
    let productNumbers = localStorage.getItem('itemNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('itemNumbers', productNumbers + 1 );
        document.querySelector('.cart-link span').textContent = productNumbers + 1 ;
    } else {
        localStorage.setItem('itemNumbers', 1);
        document.querySelector('.cart-link span').textContent = 1;
    }
}

onLoaditemNumbers();

