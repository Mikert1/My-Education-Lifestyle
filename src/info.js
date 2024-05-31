async function getData() {
    try {
        const response = await fetch('src/coaches.json');
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
}
function getQueryParams() {
    let params = {};
    let queryString = window.location.search.slice(1);
    let queryArray = queryString.split('&');
    queryArray.forEach(function(param) {
        let [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });
    return params;
}

let params = getQueryParams();
if (params.name) {
    console.log(params.name);
} else {
    console.log("No specialty provided");
}
const promise = getData();
const template = document.getElementById("hello");
promise.then(data => {
    for (let i = 0; i < data.length; i++) {
        if (params.name == data[i].name) {
            let cartDiv = document.createElement("div");
            cartDiv.classList.add("card");
            const cartDivName = template.content.cloneNode(true);
            cartDivName.querySelector("#naam").textContent = data[i].name;
            cartDivName.querySelector("#email").textContent = data[i].email;
            cartDivName.querySelector("#phoneNumber").textContent = data[i].phoneNumber;
            cartDivName.querySelector("#specialty").textContent = data[i].specialty;
            cartDivName.querySelector("#image").src = data[i].image;
            document.body.appendChild(cartDivName);
        }
    }
})