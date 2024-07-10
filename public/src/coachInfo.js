async function getData() {
    let response;
    try {
        response = await fetch('src/coaches.json');
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
if (params.id) {
    console.log(params.id);
} else {
    console.log("No name provided");
}

const inputId = params.id;
const image = document.getElementById("EDITIMAGE");
const name = document.getElementById("EDITNAME");
const company = document.getElementById("EDITCOMPANY");
const specialty = document.getElementById("EDITSPECIALTY");
const phone = document.getElementById("EDITPHONE");
const email = document.getElementById("EDITEMAIL");
const website = document.getElementById("EDITWEBSITE");
const editLocation = document.getElementById("EDITLOCATION");

getData()
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.id == inputId) {
                console.log(data);
                image.src = element.image;
                name.textContent = element.name;
                company.textContent = element.company;
                specialty.textContent = element.specialty;
                phone.textContent = element.phoneNumber;
                email.textContent = element.email;
                website.textContent = element.website;
                editLocation.textContent = element.location;
            }
        }
    })
    .catch(error => {
        console.error('Error fetching:', error);
        throw error;
    });