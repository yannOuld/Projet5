
// ------------ varirables 
const API_Url = 'http://localhost:3000/api/cameras/order';
const table = document.querySelector('.table');
const form = document.getElementById('form');
const username = document.getElementById('user-name');
const firstname = document.getElementById('user-firstname');
const adress = document.getElementById('user-adress');
const city = document.getElementById('user-city');
const email = document.getElementById('email');
const submit_btn = document.getElementById('submit-btn');
const items = JSON.parse(localStorage.getItem('item'));

// ------------ verifications des inputs
function checkinput() {
    const firstnameValue = firstname.value.trim();
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const adressValue = adress.value.trim();
    const cityValue = city.value.trim();

    // verifier chaque valeur des input
    if (usernameValue === '') {
        setErrorFor(username, 'Le nom doit etre rempli !')
    } else {
        setSuccesFor(username)
    }
    if (firstnameValue === '') {
        setErrorFor(firstname, 'Le prénom doit etre rempli !')
    }
    else {
        setSuccesFor(firstname)
    }
    if (adressValue === '') {
        setErrorFor(adress, 'votre adresse doit etre rempli !')
    } else {
        setSuccesFor(adress)
    }
    if (cityValue === '') {
        setErrorFor(city, 'vous devez indiquez votre ville !')
    }
    else {
        setSuccesFor(city)
    }
    if (emailValue === '') {
        setErrorFor(email, 'vous devez indiquez un email !')
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'email non valide !')
    } else {
        setSuccesFor(email);
    }
};

// ------------ verifier si la valeur de l'input est un email
function isEmail(email) {
    return /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i.test(email)
}



// ------------ fonction qui envoie les messages d'erreurs
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    // ajouter le message d'erreur 
    small.innerText = message;
    // ajouter une classe au message d'erreur 
    small.className = 'text-danger'
}

// ------------ fonction qui envoie un message de confirmation de l'input 
function setSuccesFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    // ajouter un message 
    small.textContent = 'ok ! ';
    // ajouter une classe au message d'erreur 
    small.className = 'text-success'

}
// ------------ requete serveur

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkinput();
    passOrder66();

});

function passOrder66() {
    let formData = {
        'prenom': firstname.value.trim(),
        'nom': username.value.trim(),
        'email': email.value.trim(),
        'adresse': adress.value.trim(),
        'ville': city.value.trim()
    };


    const listproducts = [];
    items.forEach(item => {
        listproducts.push(item._id)
    });



    //envoie des données formulaire au serveur
    const contact = formData, listproducts;
    console.log(contact);
    const order = JSON.stringify(contact);
    console.log('hello');
    console.log(order);
    const postRequest = fetch(API_Url, {
        method: "POST",
        body: order,
        headers: {
            'Accept': 'application / json',
            'Content-type': 'application/json'
        },
    })

    postRequest.then(async (response) => {
        try {
            const requestOrder = await response.json();
            console.log(requestOrder);
        } catch (e) {
            console.log(e);
        }
    })

}

