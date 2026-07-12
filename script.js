function openMenu(){
document.getElementById("sidebar").style.left="0";
}

function closeMenu(){
document.getElementById("sidebar").style.left="-280px";
}

function openSearch(){

const box=document.getElementById("searchBox");

if(box.style.display==="block"){
box.style.display="none";
}else{
box.style.display="block";
}

}

console.log("INDZENO Loaded Successfully");
