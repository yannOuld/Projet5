function populateTable() {
    let items = JSON.parse(localStorage.getItem('item'));
    let table = document.querySelector('.table');
    if (localStorage.getItem('item')) {
        items.forEach((item) => {
            // implementation des produits dans le tableau 
            let tabtr = document.createElement('tr');
            tabtr.classList.add('table-item');

            let tab_image = document.createElement('td');
            let image = document.createElement('img');
            tab_image.className = 'w-25'
            image.className = 'w-100';
            image.src = item.imageUrl;
            tab_image.appendChild(image);

            let tab_product_name = document.createElement('td');
            let product_name = document.createElement('p');
            product_name.innerHTML = item.name;
            tab_product_name.appendChild(product_name);

            let tab_qte = document.createElement('td');
            let qte = document.createElement('p');

            qte.className = 'ml-4';
            qte.innerHTML = item.amount;
            tab_qte.appendChild(qte);

            let tab_delete = document.createElement('td');
            let delete_btn = document.createElement('button');
            delete_btn.className = 'btn btn-danger text-light btn-rmv'
            delete_btn.innerHTML = 'X';
            delete_btn.setAttribute('id', item._id);
            deleteItem();
            tab_delete.appendChild(delete_btn);

            let tab_price = document.createElement('td');
            let price = document.createElement('p');
            price.innerHTML = item.price / 100 + '€';
            tab_price.appendChild(price);

            tabtr.append(tab_image, tab_product_name, tab_qte, tab_price, tab_delete)
            table.appendChild(tabtr);
        });
    }
    // ligne de fin de tableau 
    let tabtot = document.createElement('tr');
    tabtot.classList.add('table-total');
    let empty_one = document.createElement('td');
    let empty_two = document.createElement('td');
    let empty_three = document.createElement('td');
    let empty_four = document.createElement('td');
    let totalprice = document.createElement('td');
    // bouton vider le panier 
    let clear_btn = document.createElement('button');
    clear_btn.className = 'btn-danger'
    clear_btn.innerHTML = 'vider le panier';
    clear_btn.addEventListener('click', function (event) {
        event.preventDefault();
        clearTable();
    })
    // contenu de la ligne 
    empty_two.appendChild(clear_btn);
    empty_three.textContent = 'Prix total:';
    empty_one.innerHTML = '';
    empty_four.innerHTML = '';
    tablePrice();
    totalprice.innerHTML = parseFloat(total.toFixed(2)) + '€';
    tabtot.append(empty_one, empty_two, empty_three, empty_four, totalprice);
    table.appendChild(tabtot);
}

// fonction pour enlever les items 
function deleteItem() {
    let remove_btns = document.getElementsByClassName('btn-rmv');
    let items = JSON.parse(localStorage.getItem('item'));
    for (let i = 0; i < remove_btns.length; i++) {
        remove_btns[i].onclick = function removeProduct(event) {
            event.preventDefault();
            console.log(remove_btns[i])
            rmv_btn = event.target;
            result = items.filter(item => rmv_btn.id !== item._id)
            localStorage.setItem('item', JSON.stringify(result))
            window.location.reload();
        }
    }
};

function clearTable() {
    localStorage.removeItem('item');
    window.location.reload();
};

function tablePrice() {
    let items = JSON.parse(localStorage.getItem('item'));
    total = 0;
    if (localStorage.getItem('item')) {
        items.map(item => {
            total += item.price * item.amount / 100;
        });
    }
}

document.addEventListener('DOMContentLoaded', populateTable)