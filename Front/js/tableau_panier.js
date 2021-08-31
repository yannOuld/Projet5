
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
        delete_btn.dataset = item._id;
        delete_btn.addEventListener("click", (e) => {
            if (event.target.classList.contains("btn-rmv")) {
                let removeItem = event.target;
                let id = removeItem.dataset._id;
                items.removeChild(removeItem.parentElement.parentElement)
            }
            for (var i = 0; i < delete_btn.lenght; i++) {
                let remove = delete_btn[i]
                let items = JSON.parse(localStorage.getItem('item'))
                items.forEach(item => {
                    item = items.filter(item => item._id !== _id);
                    localStorage.setItem('item', JSON.stringify(item));
                })
            }
        })
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
    empty_one.textContent = 'Prix total:';
    empty_two.innerHTML = '';
    empty_three.innerHTML = '';
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


document.addEventListener('DOMContentLoaded', populateTable)