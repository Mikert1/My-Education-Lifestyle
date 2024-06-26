//change the value of the input field with id=i
async function getData(type) {
    try {
        let response;
        if (type == "text") {
            response = await fetch('src/texts.json');
        }
        else if (type == "coaches") {
            response = await fetch('src/coaches.json');
        }
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

getData("text")
    .then(data => {
        for (var i = 0; i <= data.length; i++) {
            if (document.getElementById(i)) {
                for (var j = 0; j < data.length; j++) {
                    if (document.getElementById(i).id == data[j].id) {
                        document.getElementById(i).value = data[j].text;
                    }
                }
            }
        }
    })
    .catch(error => {
        console.error('Error fetching:', error);
        throw error;
    });
const template = document.getElementById("coachTemplate");
getData("coaches")
    .then(data => {
        for (var i = 0; i < data.length; i++) {
                const cartDivName = template.content.cloneNode(true);
                cartDivName.querySelector("#image").src = data[i].image;
                cartDivName.querySelector("#naam").textContent = data[i].name;
                cartDivName.querySelector("#specialty").textContent = data[i].specialty;
                document.getElementById("coach").appendChild(cartDivName);
        }
    })
    .then(() => {
        const addTemplate = document.getElementById("addTemplate");
        const cartDivName = addTemplate.content.cloneNode(true);
        cartDivName.querySelector(".card").style.height = "384.433px";
        const newDiv = document.createElement("div");
        newDiv.classList.add("addCircle");
        newDiv.textContent = "+";
        cartDivName.querySelector(".card").addEventListener("click", function() {
            window.location.href = "edit.html";
        });
        cartDivName.querySelector(".card").appendChild(newDiv);
        document.getElementById("coach").appendChild(cartDivName);
    })