import {showData} from "./showData";

// ****** DATA ****** //
export const Data = (function () {
    const getData = () => {   
        const inputStart = document.querySelector("#startDate");
        const inputEnd = document.querySelector("#endDate"); 
        const startDate = new Date(inputStart.value);
        const endDate = new Date(inputEnd.value); 

        // Filtriranje unetih inputa i prikazivanje vrednosti
        if(inputStart.value === "" || inputEnd.value === "") { 
            Swal.fire(
                'Niste uneli vrednosti!',
                'Molimo pokusajte ponovo',
                'warning'
                )           
        } else if(endDate.getDate() - startDate.getDate() > 7 || endDate.getDate() - startDate.getDate() === 0) {  
            Swal.fire(
                'Raspon mora biti 7 dana ili manji!',
                'Molimo pokusajte ponovo',
                'warning'
              )    
        } else if(startDate.getDate() > endDate.getDate()){  
            Swal.fire(
                'Start Date mora biti manji od end date vrednosti!',
                'Molimo pokusajte ponovo',
                'warning'
              )  
        } else if(startDate.getFullYear() < 1900){ 
            Swal.fire(
                'Unesite godinu od 1900!',
                'Molimo pokusajte ponovo',
                'warning'
              )   
        } else {
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${inputStart.value}&end_date=${inputEnd.value}&api_key=x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2`)
            .then(response => response.json())            
            .then(data => showData(data))            
            .catch(err => console.error(err));            
        }
    }   
    return {
        getData
    }
})();