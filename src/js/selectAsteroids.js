
export const Asteroids = (() => {
    const autoInput = document.querySelector(".chosenInput");
    const asteroids = document.querySelector(".asteroids");
    let chartValues = [];   
    let history = [];  
    
    // Select asteroids and display them in the field
    const asteroidSelect = (e) => {
        let selected = true; 
        
        history.map(val => {
            if(e.target.value === val.name && chartValues.every(s => !~s.indexOf(e.target.value))) {
                chartValues = [...chartValues, [val.name, val.close_approach_data]];  
                let wrap = document.createElement("div");
                let p = document.createElement("p"); 
                let remove = document.createElement("i");
                remove.setAttribute("class","fas fa-times"); 
                remove.addEventListener('click', removeAsteroid)           
                p.innerHTML = e.target.value;
                asteroids.appendChild(wrap);
                wrap.appendChild(p);
                wrap.appendChild(remove);
                selected = false;
            }    
        })  
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
        e.target.previousElementSibling.style.display = "none";
        e.target.style.display = "none";
        chartValues = chartValues.filter(item => e.target.previousElementSibling.innerHTML !== item[0]);        
    }
    
    // Exporting charts and history data
    const chartsData = () => {   
        return chartValues;
    }
    const historyData = () => {   
        return history;
    }
    
    // Get additional data about asteroid 
    const additionalData = link => {
        fetch(link)
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
        additionalData
    }
})()


