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
if (params.name) {
    console.log(params.name);
} else {
    console.log("No name provided");
}

const inputName = params.name;
const image = document.getElementById("EDITIMAGE");
const source = document.getElementById("EDITSOURCE");
const name = document.getElementById("EDITNAME");
const specialty = document.getElementById("EDITSPECIALTY");
const disable = document.getElementById("EDITDISABLE");
const phone = document.getElementById("EDITPHONE");
const email = document.getElementById("EDITEMAIL");
const save = document.getElementById("EDITSAVE");

getData()
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.name == inputName) {
                console.log(data);
                image.src = element.image;
                source.value = element.image;
                name.value = element.name;
                specialty.value = element.specialty;
                phone.value = element.phoneNumber;
                email.value = element.email;
                disable.value = element.disabled;
                disable.addEventListener("click", () => {
                    element.disabled = !element.disabled;
                    disable.value = element.disabled;
                });
                save.addEventListener("click", () => {
                    element.image = source.value;
                    element.name = name.value;
                    element.specialty = specialty.value;
                    element.phoneNumber = phone.value;
                    element.email = email.value;
                    element.disabled = disable.value;
                    data[i] = element;
                    // give php waht it need to save data to json so i can do $data = json_decode($_POST['data'], true);
                    const formData = new FormData();
                    formData.append('data', JSON.stringify(data));
                    fetch('src/save.php', {
                        method: 'POST',
                        body: formData
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to save');
                        }
                        alert("Saved");
                    }).catch(error => {
                        console.error('Error saving:', error);
                        throw error;
                    });
                    }
                );
            }
        }
    })
    .catch(error => {
        console.error('Error fetching:', error);
        throw error;
    });