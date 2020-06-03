import { Show } from "./showData";

// ******************** DATA ********************** //
export const Data = (() => {    
    const getData = () => {
        const inputStart = document.querySelector("#startDate");
        const inputEnd = document.querySelector("#endDate");
        const startDate = new Date(inputStart.value);
        const endDate = new Date(inputEnd.value);
        
        // Calculate date difference
        const difference = (d1, d2) => {
            let date1 = d1.getTime();
            let date2 = d2.getTime();            
            let diff = parseInt((date2 - date1)/(1000*60*60*24));
            (date2 > date1 && diff < 0) && (diff *= -1)
            return diff;
        }      

        // Filter entered inputs and display values
        if (inputStart.value === "" || inputEnd.value === "") {
            Swal.fire(
                `You didn't enter a value!`,
                'Please try again',
                'warning'
            )
        } else if (difference(startDate, endDate) > 7 || endDate.getDate() - startDate.getDate() === 0) {
            Swal.fire(
                'The range must be 7 days or less!',
                'Please try again',
                'warning'
            )
        } else if (startDate.getTime() > endDate.getTime()) {
            Swal.fire(
                'Start date must be less than End date!',
                'Please try again',
                'warning'
            )
        } else if (startDate.getFullYear() < 1900) {
            Swal.fire(
                'Enter the year from 1900!',
                'Please try again',
                'warning'
            )
        } else {
            fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${inputStart.value}&end_date=${inputEnd.value}&api_key=x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2`)
                .then(response => response.json())
                .then(data => Show.showData(data))
                .catch(err => console.error(err));
        }
    }

    return {
        getData
    }
})();