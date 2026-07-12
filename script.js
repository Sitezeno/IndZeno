// ================= SEARCH =================

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".news-card");

if(searchInput){
searchInput.addEventListener("keyup", function(){

let value = this.value.toLowerCase();

cards.forEach(card => {

let title = card.querySelector("h3").innerText.toLowerCase();

if(title.includes(value)){
card.style.display = "block";
}else{
card.style.display = "none";
}

});

});
}


// ================= ARTICLE MODAL =================

const modal = document.getElementById("articleModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".news-card").forEach(card=>{

card.addEventListener("click",()=>{

modal.style.display = "flex";

modalTitle.innerText =
card.dataset.title;

modalText.innerText =
card.dataset.content;

modalImg.src =
card.dataset.image;

});

});

function closeModal(){
modal.style.display = "none";
}


// ================= BOOKMARK =================

function saveBookmark(title){

let bookmarks =
JSON.parse(localStorage.getItem("bookmarks")) || [];

if(!bookmarks.includes(title)){

bookmarks.push(title);

localStorage.setItem(
"bookmarks",
JSON.stringify(bookmarks)
);

showToast("Saved Successfully");

}else{

showToast("Already Saved");

}

}


// ================= TOAST =================

function showToast(text){

const toast =
document.getElementById("toast");

toast.innerText = text;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}
