const slideshowContainer = document.querySelector('#slideshow_container');

async function getDigimon() {
    try {
        const response = await fetch('https://digi-api.com/api/v1/digimon');
        const data = await response.json();
        console.log(data.content);
        displayDigimonOne(data.content);

    } catch (error) {
        console.error(error);
    }
}

function displayDigimonOne(content) {
    for (let i = 0; i < content.length; i++) {

        let digiURL = content[i].href;

        async function getDigimonSub() {
            try {
                const response = await fetch(digiURL);
                const data = await response.json();
                console.log(data);
                displayDigimonTwo(data);

            } catch (error) {
                console.error(error);
            }
        }
        getDigimonSub();

        function displayDigimonTwo(data) {

            const digiEl = document.createElement('div');
            digiEl.classList.add('digimon');
            slideshowContainer.appendChild(digiEl);

            const nameEl = document.createElement('p');
            nameEl.classList.add('name');
            nameEl.innerText = data.name;
            digiEl.appendChild(nameEl);

            for (let i = 0; i < content.length; i++) {
                const imageEl = document.createElement('img');
                imageEl.classList.add('image');
                imageEl.src = data.images[i].href;
                digiEl.appendChild(imageEl)

                const attEl = document.createElement('p');
                attEl.classList.add('name');
                attEl.innerText = data.attributes[i].attribute;
                digiEl.appendChild(attEl);

                const levelEl = document.createElement('p');
                levelEl.classList.add('name');
                levelEl.innerText = data.levels[i].level;
                digiEl.appendChild(levelEl);

                const descrEl = document.createElement('p');
                descrEl.classList.add('name');
                descrEl.innerText = data.descriptions[1].description;
                digiEl.appendChild(descrEl);
            }

        }
    }
}

getDigimon();
