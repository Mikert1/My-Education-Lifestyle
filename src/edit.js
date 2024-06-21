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
const inputName = "naam1";
const image = document.getElementById("EDITIMAGE");
const source = document.getElementById("EDITSOURCE");
const name = document.getElementById("EDITNAME");
const specialty = document.getElementById("EDITSPECIALTY");
const disable = document.getElementById("EDITDISABLE");
const phone = document.getElementById("EDITPHONE");
const email = document.getElementById("EDITEMAIL");

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
            }
        }
    })
    .catch(error => {
        console.error('Error fetching:', error);
        throw error;
    });

