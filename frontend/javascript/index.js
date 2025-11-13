document.addEventListener('DOMContentLoaded', () => {
    generateList();

    document.getElementById('nameAddBtn').addEventListener('click', nameAddBtn);
});

const nameAddBtn = async () => {
    try {
        const name = document.getElementById('namePost').value;
        if (name !== '') {
            const response = await postFetch('/api/names', {
                name: name
            });
            console.log('Válasz: ', response);
            generateList();
        }
    } catch (error) {
        console.error('Hiba: ', error);
    }
};

const postFetch = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) //szöveggé (JSON stringgé) alakítja a JS objektumot.
        });
        if (!response.ok) {
            throw new Error('Hiba: ' + response.status + ' ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw new Error('Hiba: ', error);
    }
};

const generateList = async () => {
    try {
        const response = await getFetch('/api/names');
        const names = response.results;

        const ul = document.getElementById('forNames');
        ul.replaceChildren();
        for (const item of names) {
            const li = document.createElement('li');
            li.innerText = item;
            ul.appendChild(li);
        }
    } catch (error) {
        console.error('Hiba: ', error);
    }
};

const getFetch = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Hiba: ' + response.status + ' ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw new Error('Hiba: ', error);
    }
};
