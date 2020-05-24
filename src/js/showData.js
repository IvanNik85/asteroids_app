import { Create } from "./table";
import { Asteroids } from "./selectAsteroids";

export const Show = (() => {
    let tableCreated = false;
    let hazardousAsteroid = [];

    const showData = dataPar => {
        // Reset values
        hazardousAsteroid.length = 0;
        Asteroids.historyData().length = 0;
        Asteroids.chartsData().length = 0;       
        // Clear previous data
        removeOldValues();
        tableCreated = true;

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
        Create.table(hazardousAsteroid);
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

    return {
        showData
    }
})()

