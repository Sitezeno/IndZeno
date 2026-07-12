console.log("INDZENO Loaded Successfully");

document.addEventListener("DOMContentLoaded", function(){

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{
card.addEventListener("click",()=>{
card.style.transform="scale(1.03)";
setTimeout(()=>{
card.style.transform="scale(1)";
},200);
});
});

});
