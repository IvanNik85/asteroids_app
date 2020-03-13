import "./styles/main.scss";

// ****** DATA ****** //
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

const pageOne = document.querySelector(".pageOne");   
const pageTwo = document.querySelector(".pageTwo");   
const backBtn = document.querySelector(".backBtn");   
const autocomplete = document.querySelector("#displayed");
const autoInput = document.querySelector(".chosenInput");
const asteroids = document.querySelector(".asteroids");

function showData(dataPar) { 
    let hazardousAsteroid = [];  
    let history = [];   
    let chartValues = [];
    // Get additional data about asteroid 
    function additionalData(link) {
        fetch(link)
        .then(response => response.json())
        .then(data => retrive(data))
        .catch(err => console.error(err));  
    }
    function retrive(data) {      
        history = [...history, data]
        console.log(history)
    }
    
    Object.entries(dataPar.near_earth_objects).forEach(element => {
        element[1].map(item => {        
            if(item.is_potentially_hazardous_asteroid) {
                hazardousAsteroid = [...hazardousAsteroid, [element[0], item]];
            }  
        })        
    });       
    // console.log(hazardousAsteroid) 
    hazardousAsteroid.map(data => additionalData(data[1].links.self))    

    const tableHeaders = ["Datum", "Ime", "Brzina kretanja(km/h)", "Min.precnik(m)", "Max.precnik(m)"];
    const createTable = document.querySelector(".showTable");
    const tablehead = document.querySelector("thead tr");
    const tableBody = document.querySelector("tbody");
    const timesPassed = document.querySelector(".timesPassed");
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
            // Adding autocomplete data
            let option = document.createElement("option");
            option.setAttribute("value", hazardous[1].name);
            autocomplete.appendChild(option);
        })
        autoInput.classList.remove("none");
        asteroids.classList.remove("none");
        timesPassed.classList.remove("none");
        timesPassed.addEventListener("click", charts)
        createTable.removeEventListener("click", table);
    }   
    autoInput.addEventListener("change", selectAsteroids);

    // Select asteroids and display them in the field
    function selectAsteroids() {
        history.map(val => {
            if(this.value === val.name && chartValues.every(s => s.indexOf(this.value) === -1)) {
                chartValues = [...chartValues, [val.name, val.close_approach_data]];  
                let p = document.createElement("p"); 
                let remove = document.createElement("i");
                remove.setAttribute("class","fas fa-times"); 
                remove.addEventListener('click', removeAsteroid)           
                p.innerHTML = this.value;
                asteroids.appendChild(p);
                asteroids.appendChild(remove);                            
            }      
        })  
       
        this.value = ""
    }
    backBtn.addEventListener("click", goBack);    
    // Removing asteroids from selected list 
    function removeAsteroid () {
        this.previousElementSibling.style.display = "none";
        this.style.display = "none";
        chartValues = chartValues.filter(item => this.previousElementSibling.innerHTML !== item[0]);        
    }

    function goBack() {
        // Going to table page and removing charts
        const astOne = document.querySelectorAll(".astOne"); 
        astOne.forEach(r => r.parentNode.removeChild(r));        
        changePage(); 
    }

    function changePage() {
        // Changing pages
        pageOne.classList.toggle("none");
        pageTwo.classList.toggle("none"); 
    }

    function charts() {
        changePage();
        // Filter asteroid passes near Earth 
        chartValues.map(item => {           
            item[1] = item[1].filter(dat => {
                return parseInt(dat.close_approach_date) > 1900 && parseInt(dat.close_approach_date) < 1999    
            })           
        })
        // Create charts and color them appropriately
         chartValues.map((item, i) => {           
            let div = document.createElement('div');
            let div1 = document.createElement('div');
            let div2 = document.createElement('div');
            let div3 = document.createElement('div');
            div.classList.add('astOne');
            div1.classList.add('name');
            div2.classList.add('chart');
            div3.classList.add(`chartload`, `num${i}`);
            pageTwo.appendChild(div);
            div.appendChild(div1);
            div.appendChild(div2);
            div2.appendChild(div3);
            pageTwo.append(div);   
            div1.innerHTML = item[0];

            // Animate charts
            let load = 0
            let int = setInterval(interval, 30);
            function interval() {
                div3.style.width = `${load}%`;
                if(load === item[1].length) {
                    clearInterval(int)
                } else {
                    colorChoice();
                    load++; 
                }
            }
         
            // div3.style.width = `${item[1].length}%`;
            function colorChoice() {
                if(item[1].length < 25) {
                div3.style.background = 'green';
            } else if(item[1].length > 25 && item[1].length < 45) {
                div3.style.background = 'yellow';
            } else if(item[1].length > 45 && item[1].length < 75) {
                div3.style.background = 'orange';
            } else {
                div3.style.background = 'red';
            }   
        }
         })
    }

}

// ****** Initialization ****** //
window.onload = () => Data.getData() 
