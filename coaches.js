coachesDiv = document.getElementById("coaches");
async function getData() {
    try {
        const response = await fetch('coaches.json');
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
const promise = getData()
const template = document.getElementById("coach");
promise.then(data => {
    console.log(data.length)
    for (let i = 0; i < data.length; i++) {
        let cartDiv = document.createElement("div");
        cartDiv.classList.add("card");
        const cartDivName = template.content.cloneNode(true);
        cartDivName.querySelector("#naam").textContent = data[i].name;
        cartDivName.querySelector("#image").src = data[i].image;
        cartDivName.querySelector("#specialty").textContent = data[i].specialty;
        document.body.appendChild(cartDivName);
    }
})