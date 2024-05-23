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
promise.then(data => {
    console.log(data.length)
    for (let i = 0; i < data.length; i++) {
        let cartDiv = document.createElement("div");
        cartDiv.classList.add("card");
        cartDiv.innerHTML = `
            <h3 class="cardName">${data[i].email}</h3>
            <img src="" alt="${data[i].image}">
            <p class="button">Afspraak maken</p>
        `;
        coachesDiv.appendChild(cartDiv);
    }
})