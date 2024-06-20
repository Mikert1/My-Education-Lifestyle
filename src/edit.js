async function getData(type) {
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
getData("text")
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.name == inputName) {
                console.log(data);
                image.src = element.image;
                source.value = element.image;
            }
        }
    })
    .catch(error => {
        console.error('Error fetching:', error);
        throw error;
    });

