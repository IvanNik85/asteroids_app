import {chartsData} from "./selectAsteroids";

const pageOne = document.querySelector(".pageOne");   
const pageTwo = document.querySelector(".pageTwo");        
export function charts() {  
    if(!chartsData().length) {
        Swal.fire(
            'Odaberite neku vrednost!',
            'Molimo pokusajte ponovo',
            'warning'
            ) 
        return;
    }    
    // Filter asteroid passes near Earth 
    chartsData().map(item => {           
        item[1] = item[1].filter(dat => {
            return parseInt(dat.close_approach_date) > 1900 && parseInt(dat.close_approach_date) < 1999    
        })           
    })
    // Create charts and color them appropriately
    chartsData().map((item, i) => {           
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
        div3.innerHTML = item[1].length;

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
        // Select chart color according to length
        function colorChoice() {    
            if(item[1].length <= 25) {
                div3.style.background = '#71cb54';
            } else if(item[1].length > 25 && item[1].length <= 45) {
                div3.style.background = '#f8e13e';
            } else if(item[1].length > 45 && item[1].length <= 75) {
                div3.style.background = '#ffa500';
            } else if(item[1].length > 75){
                div3.style.background = '#ff3f3f';
            }   
        }
    })
    changePage();
}
 // Changing pages function
export function changePage() {   
    pageOne.classList.toggle("none");
    pageTwo.classList.toggle("none"); 
}