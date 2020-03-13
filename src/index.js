import "./styles/main.scss";

// *** DATA *** //
const Data = (function () {
    const getData = () => {
        fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-12-30&end_date=2018-01-06&api_key=x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2")
            .then(response => response.json())
            .then(data => showData(data))
            .catch(err => console.error(err));
    }
    return {
        getData
    }
})();

function showData(dataPar) {
    let hazardousAsteroid = [];
    Object.entries(dataPar.near_earth_objects).forEach(element => {
        element[1].map(item => {        
            if(item.is_potentially_hazardous_asteroid) {
                hazardousAsteroid = [...hazardousAsteroid, [element[0], item]];
            }  
        })        
    });        
    const tableHeaders = ["Datum", "ime", "Brzina kretanja(km/h)", "Min.precnik(m)", "Max.precnik(m)"];
    const createTable = document.querySelector(".showTable");
    const tablehead = document.querySelector("thead tr");
    const tableBody = document.querySelector("tbody");
    const timesPassed = document.querySelector(".timesPassed");
    const asteroids = document.querySelector(".asteroids");    
    createTable.addEventListener("click", table);
    // Generating table and data
    function table() {
        tableHeaders.map(name => {
            let th = document.createElement("th");
            th.innerHTML = name;
            tablehead.appendChild(th);            
        })       
        hazardousAsteroid.map(hazardous => {
            // Adding data to the table
            let row = tableBody.insertRow(0);
            row.insertCell(0).innerHTML = hazardous[0];
            row.insertCell(1).innerHTML = hazardous[1].name;
            row.insertCell(2).innerHTML = hazardous[1].close_approach_data[0].relative_velocity.kilometers_per_hour;
            row.insertCell(3).innerHTML = hazardous[1].estimated_diameter.meters.estimated_diameter_min;
            row.insertCell(4).innerHTML = hazardous[1].estimated_diameter.meters.estimated_diameter_max;
            // Adding list of chosen asteroids
            let p = document.createElement("p"); 
            let remove = document.createElement("i");
            remove.setAttribute("class","fas fa-times"); 
            remove.addEventListener('click', removeAsteroid)           
            p.innerHTML = hazardous[1].name; 
            asteroids.appendChild(p);
            asteroids.appendChild(remove);
        })
        
        timesPassed.classList.remove("none");
        createTable.removeEventListener("click", table);
    }    
    function removeAsteroid () {
        console.log(`removed`)
    }
}


// *** Initialization *** //
window.onload = () => Data.getData() 
