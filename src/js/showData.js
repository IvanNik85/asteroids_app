import { Create } from "./table";
import { Asteroids } from "./selectAsteroids";

export const Show = (() => {
    let tableCreated = false;
    let hazardousAsteroid = [];
    const noAsteroidMessage = document.querySelector(`.tableData p`);

    const showData = dataPar => {
        // Reset values
        hazardousAsteroid.length = 0;
        
        Asteroids.historyData().length = 0;
        Asteroids.chartsData().length = 0;       
        // Clear previous data        
        !noAsteroidMessage.innerHTML && removeOldValues();
        tableCreated = true;
        noAsteroidMessage.innerHTML = ''
        // Filtering pottentialy hazardous asteroids
        Object.entries(dataPar.near_earth_objects).forEach(element => {
            element[1].map(item => {
                if (item.is_potentially_hazardous_asteroid) {
                    hazardousAsteroid = [...hazardousAsteroid, [element[0], item]];
                }
            })
        });      

        // Get additional data 
        hazardousAsteroid.map(data => Asteroids.additionalData(data[1].links.self));     

        // Generate table  
        Create.showHide(`block`, `none`); 
        setTimeout(function() {
            hazardousAsteroid.length ?
            Create.table(hazardousAsteroid) : 
            noAsteroids()      
        }, 1000)        
    }

    // Removing old values function
    const removeOldValues = () => {
        const tableData = document.querySelector("table");
        tableCreated && tableData.parentNode.removeChild(tableData);
        const option = document.querySelectorAll("option");
        tableCreated && option.forEach(r => r.parentNode.removeChild(r));
        const astField = document.querySelectorAll(".asteroids div");
        tableCreated && astField.forEach(r => r.parentNode.removeChild(r));
    }
    // No Asteroids in searched values
    const noAsteroids = () => {
        noAsteroidMessage.innerHTML = `No asteroids for selected period of time`;
        Create.showHide(`none`, `none`)
    }

    return {
        showData
    }
})()

