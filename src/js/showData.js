import {table} from "./table";
import {changePage} from "./charts";
import {additionalData, history, chartValues} from "./selectAsteroids";

const backBtn = document.querySelector(".backBtn");
let tableCreated = false; 
let hazardousAsteroid = [];

export function showData(dataPar) {  
    // Reset and remove old values when new table is created
    hazardousAsteroid.length = 0;
    history.length = 0;
    chartValues.length = 0;  
    removeOldValues();
    tableCreated = true;   
    // Filtering pottentialy hazardous asteroids
    Object.entries(dataPar.near_earth_objects).forEach(element => {
        element[1].map(item => {        
            if(item.is_potentially_hazardous_asteroid) {
                hazardousAsteroid = [...hazardousAsteroid, [element[0], item]];
            }  
        })        
    });       
    // Get additional data 
    hazardousAsteroid.map(data => additionalData(data[1].links.self)); 
    // Generate table
    table(hazardousAsteroid);    
}

backBtn.addEventListener("click", goBack);
// Going to table page and removing charts
function goBack() {
    const astOne = document.querySelectorAll(".astOne"); 
    astOne.forEach(r => r.parentNode.removeChild(r));        
    changePage(); 
}       
// Removeing old values function
function removeOldValues() {
    const tableData = document.querySelector("table"); 
    tableCreated && tableData.parentNode.removeChild(tableData);  
    const option = document.querySelectorAll("option"); 
    tableCreated && option.forEach(r => r.parentNode.removeChild(r)); 
    const astField = document.querySelectorAll(".asteroids div"); 
    tableCreated && astField.forEach(r => r.parentNode.removeChild(r)); 
}


