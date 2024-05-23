coachesDiv = document.getElementById("coaches");
for (let i = 0; i < 3; i++) {
    let cartDiv = document.createElement("div");
    cartDiv.classList.add("card");
    cartDiv.innerHTML = `
        <h3 class="cardName">Naam</h3>
        <img src="" alt="image">
        <p class="button">Afspraak maken</p>
    `;
    coachesDiv.appendChild(cartDiv);
}