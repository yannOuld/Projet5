// Gerer le panier de la page index //

let panier = document.querySelectorAll('.add-panier');

let products = [
    {
        name: 'Zurss 50S',
        tag: 'vcam1',
        price: 49900 ,
        count: 0
    },
    {
        name: 'Hirsch 400DTS',
        tag: 'vcam2',
        price: 309900,
        count: 0 , 
    },
    {
        name: 'Franck JS 105',
        tag: 'vcam3',
        price: 209900,
        count: 0 , 
    },
    {
        name: 'Kuros TTS',
        tag: 'vcam4',
        price: 159900,
        count: 0 , 
    },
    {
        name: 'Katatone',
        tag: 'vcam5',
        price: 59900,
        count: 0 , 
    }
];

for (let i=0; i < panier.length; i++) {
    panier[i].addEventListener('click' , () => {
        itemNumbers(products[i]);
    })
}

function onLoaditemNumbers() {
    let productNumbers = localStorage.getItem('itemNumbers');
    if(productNumbers) {
        document.querySelector('.cart-link span').textContent = productNumbers;
    }
}

function itemNumbers(product) {
    console.log("your item is ", product) ;
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
