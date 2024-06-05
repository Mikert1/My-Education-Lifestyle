//change the value of the input field with id=i
async function getData() {
    try {
        const response = await fetch('src/texts.json');
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

getData()
    .then(data => {
        for (var i = 0; i < 5; i++) {
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