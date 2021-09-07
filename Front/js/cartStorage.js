export function getItem() {
    let storage = JSON.parse(localStorage.getItem("item"));
    if (!storage) {
        storage = [];
    }
    return storage;
};

export function setItem(storage) {
    localStorage.setItem("item", JSON.stringify(storage));
}