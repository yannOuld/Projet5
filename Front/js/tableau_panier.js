

function populateTable() {
    let items = JSON.parse(localStorage.getItem('item'));
    let table = document.querySelector('.table');
    items.forEach((item) => {
        // implementation des different element 
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
        let remove_btns = document.getElementsByClassName('btn-rmv');
        for (let i = 0; i < remove_btns.length; i++) {
            //  rmv_btn = remove_btns[i];
            remove_btns[i].onclick = function removeProduct(event) {
                event.preventDefault();
                rmv_btn = event.target;
                items = JSON.parse(localStorage.getItem('item'));
                result = items.filter(item => rmv_btn.id !== item._id)
                localStorage.setItem('item', JSON.stringify(result))
                window.location.reload();

            }
        }
        tab_delete.appendChild(delete_btn);
        //delete_btn.addEventListener

        let tab_price = document.createElement('td');
        let price = document.createElement('p');
        price.innerHTML = item.price / 100 + '€';
        tab_price.appendChild(price);

        tabtr.append(tab_image, tab_product_name, tab_qte, tab_price, tab_delete)
        // tabtr.innerHTML = `<td><img src="${item.imageUrl} class="img-thumbnail"></td><td class="text-right"> qté : ${item.amount} <button class="btn btn-info">+</button><button class="btn btn-secondary">-</button></td><td class="text-right">${item.name}</td><td class="text-right">${item.price / 100}€</td><td><button class="remove-btn btn-danger text-light ">X</button></td>`;
        table.appendChild(tabtr);
    });


    // ligne du prix total 
    let tabtot = document.createElement('tr');
    tabtot.classList.add('table-total');
    let empty_one = document.createElement('td');
    let empty_two = document.createElement('td');
    let empty_three = document.createElement('td');
    let empty_four = document.createElement('td')
    let totalprice = document.createElement('td');
    let clear_btn = document.createElement('button');
    clear_btn.textContent = 'vider le panier';
    clear_btn.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.reload();
        localStorage.removeItem('item');
    })
    empty_two.appendChild(clear_btn);
    empty_three.textContent = 'Prix total:';
    empty_one.innerHTML = '';
    empty_four.innerHTML = '';
    items = JSON.parse(localStorage.getItem('item'));
    total = 0;
    items.map(item => {
        total += item.price * item.amount / 100;
    });
    totalprice.innerHTML = parseFloat(total.toFixed(2)) + '€';
    tabtot.append(empty_one, empty_two, empty_three, empty_four, totalprice);
    table.appendChild(tabtot);

}
/*function deleteProduct(){
    let remove_btns = document.getElementsByClassName('btn-rmv');
    for (let i = 0; i < remove_btns.length; i++) {
        //  rmv_btn = remove_btns[i];
        remove_btns[i].onclick = function removeProduct(event) {
            rmv_btn = event.target;
            items = JSON.parse(localStorage.getItem('item'));
            result = items.filter(item => rmv_btn.id !== item._id)
            localStorage.setItem('item', JSON.stringify(result))
            window.location.reload();
 
        }
    }
}
    // boutons pour enlever des articles
    function suppProduct() {
    }
}
*/

document.addEventListener('DOMContentLoaded', populateTable)