const baseUrl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let selectall=document.querySelectorAll("select");
let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");


for(select of selectall){for (keys in countryList){
    if(select.name==="from" && keys==="USD"){
        select.innerHTML=select.innerHTML+`<option value=${keys} selected>${keys}</option>`;
    }
    else if(select.name==="to" && keys==="INR"){
        select.innerHTML=select.innerHTML+`<option value=${keys} selected>${keys}</option>`;
    }
    else{
    select.innerHTML=select.innerHTML+`<option value=${keys}>${keys}</option>`;
    }
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
})}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});  

const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal==="" || amountVal<=0)
        {
            amountVal=amount.value=1;
        }
    newUrl=`${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(newUrl);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount=amountVal*rate;
    msg.innerText=`${amountVal}${fromCurr.value}=${finalAmount}${toCurr.value}`;
}