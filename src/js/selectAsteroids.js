
const autoInput = document.querySelector(".chosenInput");
const asteroids = document.querySelector(".asteroids");
autoInput.addEventListener("change", asteroidSelect);
export let chartValues = [];   
export let history = [];  

// Select asteroids and display them in the field
function asteroidSelect() { 
    history.map(val => {
        if(this.value === val.name && chartValues.every(s => s.indexOf(this.value) === -1)) {
            chartValues = [...chartValues, [val.name, val.close_approach_data]];  
            let wrap = document.createElement("div");
            let p = document.createElement("p"); 
            let remove = document.createElement("i");
            remove.setAttribute("class","fas fa-times"); 
            remove.addEventListener('click', removeAsteroid)           
            p.innerHTML = this.value;
            asteroids.appendChild(wrap);
            wrap.appendChild(p);
            wrap.appendChild(remove);
        }    
    })  
    this.value = "" 
}  

// Removing asteroids from selected list 
function removeAsteroid () {   
    this.previousElementSibling.style.display = "none";
    this.style.display = "none";
    chartValues = chartValues.filter(item => this.previousElementSibling.innerHTML !== item[0]);        
}

// exporting charts data
export function chartsData() {
    let data = [];
    data = [...chartValues];
    return data;
}

// Get additional data about asteroid 
export function additionalData(link) {
    fetch(link)
    .then(response => response.json())
    .then(data => retrive(data))
    .catch(err => console.error(err));  
}
function retrive(data) {      
    history = [...history, data]    
}
