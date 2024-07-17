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
        let element;
        for (let i = 0; i <= data.length; i++) {
            if (document.getElementById(i)) {
                element = document.getElementById(i);
                for (let j = 0; j < data.length; j++) {
                    if (element.id == data[j].id) {
                        element.textContent = data[j].text;
                    }
                }
            }
        }
    })
    .catch(error => {
        console.error('Error fetching:', error);
        throw error;
    });
