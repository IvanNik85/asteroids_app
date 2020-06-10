import { Chart } from "./charts";

// Generating table and data
export const Create = (() => { 
    const table = one => {
        const tableHeaders = ["Date", "Name", "Movement speed(km/h)", "Min.diameter(m)", "Max.diameter(m)"];
        const timesPassed = document.querySelector(".timesPassed");
        const autocomplete = document.querySelector("#displayed");
        const tab = document.querySelector(".tableData");
        const table = document.createElement("table");
        tab.appendChild(table);
        const tableBody = document.createElement("tbody");
        table.appendChild(tableBody)
        const tableHead = document.createElement("thead");
        table.appendChild(tableHead)
        const tr = document.createElement("tr");
        tableHead.appendChild(tr);       

        // Creating table header
        tableHeaders.map(name => {
            const th = document.createElement("th");
            th.innerHTML = name;
            tr.appendChild(th);
            tableHead.appendChild(tr);
        })

        // Create option elements
        const optionCreate = (opt) => {
            let option = document.createElement("option");
            option.setAttribute("value", opt);
            autocomplete.appendChild(option);
        }
        optionCreate(`All Asteroids`)

        one.map(hazardous => {
            // Adding data to the table   
            let row = tableBody.insertRow(0);
            row.insertCell(0).innerHTML = hazardous[0];
            row.insertCell(1).innerHTML = hazardous[1].name;
            row.insertCell(2).innerHTML = hazardous[1].close_approach_data[0].relative_velocity.kilometers_per_hour;
            row.insertCell(3).innerHTML = hazardous[1].estimated_diameter.meters.estimated_diameter_min;
            row.insertCell(4).innerHTML = hazardous[1].estimated_diameter.meters.estimated_diameter_max;
            // Adding autocomplete data
            optionCreate(hazardous[1].name)
        })

        document.querySelector(".chosenInput").classList.remove("none");
        document.querySelector(".asteroids").classList.remove("none");
        timesPassed.classList.remove("none");
        timesPassed.addEventListener("click", Chart.charts);  
        showHide(`none`, `flex`);        
    }
    // Show loader and autocompleteBox function
    const showHide = (displayOne, displayTwo) => {
        const circleLoader = document.querySelector(`.circle-loader`);
        const autocompleteBox = document.querySelector(`.autocompleteBox`);
        circleLoader.style.display = displayOne;
        autocompleteBox.style.display = displayTwo;
    }

    return {
        showHide,        
        table
    }
})()

