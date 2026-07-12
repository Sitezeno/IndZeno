function openMenu(){
document.getElementById("sidebar").classList.add("active");
document.getElementById("overlay").classList.add("active");
}

function closeMenu(){
document.getElementById("sidebar").classList.remove("active");
document.getElementById("overlay").classList.remove("active");
}

function openSearch(){
document.getElementById("searchBox").classList.toggle("active");
}

document.getElementById("overlay").onclick = closeMenu;
