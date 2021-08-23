let items = JSON.parse(localStorage.getItem('item'));
populateTable();
console.log(items);

function populateTable() {
    let table = document.querySelector('.table');
    items.forEach((item) => {
        let tabtr = document.createElement('tr');
        tabtr.classList.add('table-item');
        tabtr.innerHTML = `<td><img src="${item.imageUrl} class="img-thumbnail"></td><td class="text-right"> qté : ${item.amount} <button class="btn btn-info">+</button><button class="btn btn-secondary">-</button></td><td class="text-right">${item.name}</td><td class="text-right">${item.price / 100}€</td><td><button class="remove-btn btn-danger text-light ">X</button></td>`;
        table.appendChild(tabtr);
    });
}

