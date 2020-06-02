
export const Asteroids = (() => {
    const autoInput = document.querySelector(".chosenInput");
    const asteroids = document.querySelector(".asteroids");
    let chartValues = [];
    let history = [];
    let allAsteroids = false;

    // Select asteroids and display them in the field
    const asteroidSelect = (e) => {
        let selected = true;
        allAsteroids = false;

        // Creating selected asteroids list
        const createAsteroidList = (value) => {
            let wrap = document.createElement("div");
            let p = document.createElement("p");
            let remove = document.createElement("i");
            remove.setAttribute("class", "fas fa-times");
            remove.addEventListener('click', removeAsteroid)
            p.innerHTML = value;
            asteroids.appendChild(wrap);
            wrap.appendChild(p);
            wrap.appendChild(remove);
            selected = false;
        }

        // Adding asteroids to list according to selected values
        history.map(val => {
            if (e.target.value === val.name && chartValues.every(s => !~s.indexOf(e.target.value))) {
                chartValues = [...chartValues, [val.name, val.close_approach_data]];
                createAsteroidList(e.target.value);
            }
        })

        // Selecting all asteroids
        if (e.target.value === `All Asteroids` && !allAsteroids) {
            allAsteroids = true;
            chartValues.length = 0;
            while (asteroids.firstChild) {
                asteroids.firstChild.remove();
            }
            history.map(value => {
                chartValues = [...chartValues, [value.name, value.close_approach_data]];
                createAsteroidList(value.name);
            });
        }

        // Disable selecting double values
        selected && Swal.fire(
            `Asteroid already selected!`,
            'Please try again',
            'warning'
        )
        e.target.value = ""
    }
    autoInput.addEventListener("change", asteroidSelect);

    // Removing asteroids from selected list 
    const removeAsteroid = (e) => {
        allAsteroids = false;
        e.target.parentElement.style.display = "none";
        chartValues = chartValues.filter(item => e.target.previousElementSibling.innerHTML !== item[0]);
    }

    // Exporting charts and history data
    const chartsData = () => chartValues;
    const historyData = () => history;

    //Replase string element function
    const replaceElement = (str, val, pos) => `${str.slice(0, pos)}${val}${str.slice(pos)}`;

    // Get additional data about asteroid 
    const additionalData = link => {
        fetch(replaceElement(link, 's', 4))
            .then(response => response.json())
            .then(data => retrive(data))
            .catch(err => console.error(err));
    }
    const retrive = data => {
        history = [...history, data]
    }

    return {
        chartsData,
        historyData,
        additionalData,
        allAsteroids
    }
})()


