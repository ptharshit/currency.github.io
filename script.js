let header = new Headers();
header.append("apikey",'ogw2hHzgYSLucPjCKuyUIcNODUJD0oyS');
const URL_exchange= "https://api.apilayer.com/exchangerates_data/convert?";
let options = {
    method:'Get',
    redirect: 'follow',
    headers: header
};

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = "selected";
        }
        else if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
    
}

const updateFlag=(element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

button.addEventListener("click",(e)=>{
    e.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate =async ()=>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" && amtValue <= "1"){
        amtValue = 1;
        amount.value = 1;
    }
    const URL = `${URL_exchange}to=${toCurr.value}&from=${fromCurr.value}&amount=${amtValue}`;
    let response = await fetch(URL,options);
    let data = await response.json();
    msg.innerText = `${amtValue} ${fromCurr.value} = ${data.result} ${toCurr.value}`;
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})