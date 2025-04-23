function handleKeyDownEnter(event){
    if(event.key==='Enter'){
        calculateTotal();
    }
}
function subscribe(){  // toggeling button, hehe wow!!
    let subStatus=document.querySelector('.js-subscribe');
    if(subStatus.innerText==='Subscribe'){
        subStatus.innerHTML='Subscribed';
        subStatus.classList.add("is-subscribed");
    }else{
        subStatus.innerHTML='Subscribe';
        subStatus.classList.remove("is-subscribed");

    }
}
function calculateTotal(a){
    let cost=document.querySelector('.js-orderCost');
    let costVal=parseFloat(cost.value); // used parseFloat to convert the type of our input as float, earlie it was string
    console.log(costVal);
    console.log(typeof costVal);

    if (isNaN(costVal) || costVal < 0) {
        document.querySelector('.js-calculated')
            .innerHTML = "Please enter a valid order amount.";
        return;
    }

    if(costVal<50){
        costVal+=10;
    }

    document.querySelector('.js-calculated')
    .innerHTML=`The total cost of your order is: $${costVal}.`;
}