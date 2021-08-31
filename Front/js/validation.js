const fetchOrder = async () => {
    return await fetch('http://localhost:3000/api/cameras/order').then(
        (response) => response.json()
    );
}