const slideshowContainer = document.querySelector('.carousel__items');

async function getDigimon(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
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

            const digiEl = document.createElement('li');
            digiEl.classList.add('carousel__item');
            slideshowContainer.appendChild(digiEl);

            const imageEl = document.createElement('img');
            imageEl.classList.add('image');
            imageEl.src = data.images[0].href;
            digiEl.appendChild(imageEl)

            const textEl = document.createElement('div');
            textEl.classList.add('text');
            digiEl.appendChild(textEl);

            const nameEl = document.createElement('p');
            nameEl.classList.add('name');
            nameEl.innerText = data.name;
            textEl.appendChild(nameEl);

            const levelAttEl = document.createElement('p');
            levelAttEl.classList.add('lvlAtt');
            levelAttEl.innerText = (data.levels[0].level + " / " + data.attributes[0].attribute);
            textEl.appendChild(levelAttEl);

            const descrEl = document.createElement('p');
            descrEl.classList.add('descr');
            descrEl.innerText = data.descriptions[1].description;
            textEl.appendChild(descrEl);

        }
    }
}

getDigimon('https://digi-api.com/api/v1/digimon');
