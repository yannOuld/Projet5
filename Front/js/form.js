const form = document.getElementById('form');
const username = document.getElementById('user-name');
const firstname = document.getElementById('user-firstname');
const adress = document.getElementById('user-adress');
const city = document.getElementById('user-city');
const email = document.getElementById('email');
const submit_btn = document.getElementById('submit-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkinput();

})

// ------------ verifier les inputs
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
    } else {
        setSuccesFor(firstname)
    }
    if (adressValue === '') {
        setErrorFor(adress, 'votre adresse doit etre rempli !')
    } else {
        setSuccesFor(adress)
    }
    if (cityValue === '') {
        setErrorFor(city, 'vous devez indiquez votre ville !')
    } else {
        setSuccesFor(city)
    }
    if (emailValue === '') {
        setErrorFor(email, 'vous devez indiquez un email !')
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'email non valide !')
    } else {
        setErrorFor(email);
    }
}

function isEmail(email) {
    return /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i.test(email)
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // ajouter le message d'erreur 
    small.innerText = message;
    // ajouter une classe au message d'erreur 
    formControl.className = 'border border-danger'
}

function setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'border border-success'
}