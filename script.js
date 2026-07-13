/* =========================
   APP.JS PART 1
   MENU + SEARCH + SUPABASE
========================= */

// SUPABASE CONFIG

const SUPABASE_URL =
"https://ltknnbjsymyrpnuntwyo.supabase.co/rest/v1/";

const SUPABASE_KEY =
"sb_publishable_r2vMX1He-CTQk8yxKcGcOw__aaTWrLd";

const supabase =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

/* =========================
   SIDEBAR
========================= */

const sidebar =
document.getElementById("sidebar");

const overlay =
document.getElementById("overlay");

const openMenu =
document.getElementById("openMenu");

const closeMenu =
document.getElementById("closeMenu");

if(openMenu){

openMenu.addEventListener(
"click",
()=>{

sidebar.classList.add("active");
overlay.classList.add("active");

});

}

if(closeMenu){

closeMenu.addEventListener(
"click",
()=>{

sidebar.classList.remove("active");
overlay.classList.remove("active");

});

}

/* =========================
   SEARCH POPUP
========================= */

const searchBox =
document.getElementById("searchBox");

const openSearch =
document.getElementById("openSearch");

if(openSearch){

openSearch.addEventListener(
"click",
()=>{

searchBox.classList.add("active");
overlay.classList.add("active");

});

}

overlay.addEventListener(
"click",
()=>{

overlay.classList.remove("active");

sidebar.classList.remove("active");

if(searchBox){

searchBox.classList.remove("active");

}

});

/* =========================
   SEARCH FUNCTION
========================= */

const searchBtn =
document.getElementById("searchBtn");

const searchInput =
document.getElementById("searchInput");

if(searchBtn){

searchBtn.addEventListener(
"click",
()=>{

const keyword =
searchInput.value.trim();

if(keyword.length > 0){

window.location.href =
`search.html?q=${keyword}`;

}

});

}

/* =========================
   ACTIVE NAVIGATION
========================= */

const currentPage =
window.location.pathname
.split("/")
.pop();

document
.querySelectorAll(".bottom-nav a")
.forEach(link=>{

const href =
link.getAttribute("href");

if(href===currentPage){

link.classList.add("active");

}

});

/* =========================
   LOADING
========================= */

console.log(
"INDZENO APP STARTED"
);
/* =========================
   APP.JS PART 2
   LATEST POSTS
========================= */

async function loadLatestPosts(){

const latestContainer =
document.getElementById("latestPosts");

if(!latestContainer) return;

latestContainer.innerHTML = `
<div class="empty-post">
<h3>Loading...</h3>
</div>
`;

const { data, error } =
await supabase
.from("posts")
.select("*")
.order("created_at",{
ascending:false
})
.limit(20);

if(error){

latestContainer.innerHTML = `
<div class="empty-post">
<h3>Error Loading Posts</h3>
<p>${error.message}</p>
</div>
`;

return;

}

if(!data || data.length===0){

latestContainer.innerHTML = `
<div class="empty-post">
<h3>No Posts Found</h3>
<p>Add posts from Supabase.</p>
</div>
`;

return;

}

latestContainer.innerHTML = "";

data.forEach(post=>{

latestContainer.innerHTML += `

<div class="news-card">

<img src="${post.image}"
alt="${post.title}">

<div class="card-content">

<span class="news-category">

${post.category}

</span>

<h3>

${post.title}

</h3>

<p>

${post.description || ""}

</p>

<div class="post-meta">

<span>

${new Date(
post.created_at
).toLocaleDateString()}

</span>

</div>

<a
href="post.html?id=${post.id}"
class="read-more">

Read More

</a>

</div>

</div>

`;

});

}

/* =========================
   ALL POSTS
========================= */

async function loadAllPosts(){

const allPosts =
document.getElementById("allPosts");

if(!allPosts) return;

const { data } =
await supabase
.from("posts")
.select("*")
.order("created_at",{
ascending:false
});

if(!data) return;

allPosts.innerHTML="";

data.forEach(post=>{

allPosts.innerHTML += `

<div class="post-card">

<img src="${post.image}">

<div class="card-content">

<span class="news-category">

${post.category}

</span>

<h3>

${post.title}

</h3>

<p>

${post.description || ""}

</p>

<a
href="post.html?id=${post.id}"
class="read-more">

Read More

</a>

</div>

</div>

`;

});

}

/* =========================
   START
========================= */

loadLatestPosts();

loadAllPosts();
/* =========================
   APP.JS PART 3
   CATEGORY + REALTIME
========================= */

/* HERO SECTION */

async function loadHeroPost(){

const heroTitle =
document.getElementById("heroTitle");

const heroDesc =
document.getElementById("heroDesc");

const { data } =
await supabase
.from("posts")
.select("*")
.order("created_at",{
ascending:false
})
.limit(1);

if(!data || data.length===0)
return;

heroTitle.textContent =
data[0].title;

heroDesc.textContent =
data[0].description || "";

}

loadHeroPost();

/* =========================
   BREAKING NEWS
========================= */

async function loadBreakingNews(){

const breaking =
document.getElementById(
"breakingNews"
);

if(!breaking) return;

const { data } =
await supabase
.from("posts")
.select("title")
.order("created_at",{
ascending:false
})
.limit(10);

if(!data) return;

breaking.innerHTML = "";

data.forEach(post=>{

breaking.innerHTML += `

<span>

🔥 ${post.title}

</span>

`;

});

}

loadBreakingNews();

/* =========================
   CATEGORY POSTS
========================= */

async function loadCategoryPosts(){

const categoryBox =
document.getElementById(
"categoryPosts"
);

if(
!categoryBox ||
typeof CURRENT_CATEGORY
=== "undefined"
) return;

const { data,error } =
await supabase
.from("posts")
.select("*")
.eq(
"category",
CURRENT_CATEGORY
)
.order("created_at",{
ascending:false
});

if(error) return;

categoryBox.innerHTML="";

if(data.length===0){

categoryBox.innerHTML=`

<div class="empty-post">

<h3>

No Posts Found

</h3>

</div>

`;

return;

}

data.forEach(post=>{

categoryBox.innerHTML += `

<div class="post-card">

<img
src="${post.image}"
alt="${post.title}">

<div class="card-content">

<span
class="news-category">

${post.category}

</span>

<h3>

${post.title}

</h3>

<p>

${post.description||""}

</p>

<a
href="post.html?id=${post.id}"
class="read-more">

Read More

</a>

</div>

</div>

`;

});

}

loadCategoryPosts();

/* =========================
   REALTIME UPDATE
========================= */

supabase
.channel("posts-realtime")

.on(
"postgres_changes",
{
event:"*",
schema:"public",
table:"posts"
},
payload=>{

console.log(
"Realtime Updated",
payload
);

loadLatestPosts();

loadAllPosts();

loadHeroPost();

loadBreakingNews();

loadCategoryPosts();

}
)

.subscribe();

/* =========================
   SEARCH FILTER
========================= */

const searchInputBox =
document.getElementById(
"searchInput"
);

if(searchInputBox){

searchInputBox
.addEventListener(
"keyup",
function(){

const keyword =
this.value.toLowerCase();

document
.querySelectorAll(
".news-card,.post-card"
)

.forEach(card=>{

const text =
card.innerText
.toLowerCase();

card.style.display =
text.includes(keyword)
? "block"
: "none";

});

});

}

/* =========================
   APP READY
========================= */

console.log(
"INDZENO REALTIME READY"
);
/* =========================
   APP.JS PART 4
   SINGLE POST PAGE
========================= */

const params =
new URLSearchParams(
window.location.search
);

const postId =
params.get("id");

/* =========================
   LOAD SINGLE POST
========================= */

async function loadSinglePost(){

const postContainer =
document.getElementById(
"singlePost"
);

if(
!postContainer ||
!postId
) return;

const { data,error } =
await supabase
.from("posts")
.select("*")
.eq("id",postId)
.single();

if(error) return;

document.title =
data.title;

postContainer.innerHTML = `

<div class="article-header">

<img
src="${data.image}"
alt="${data.title}">

<h1>

${data.title}

</h1>

<div class="article-meta">

<span>

${data.category}

</span>

<span>

${new Date(
data.created_at
).toLocaleDateString()}

</span>

</div>

</div>

<div class="article-content">

${data.content}

</div>

<div class="article-actions">

<button id="shareBtn">

Share Article

</button>

</div>

`;

loadRelatedPosts(
data.category,
data.id
);

updateViews(data.id);

}

loadSinglePost();

/* =========================
   RELATED POSTS
========================= */

async function loadRelatedPosts(
category,
currentId
){

const related =
document.getElementById(
"relatedPosts"
);

if(!related) return;

const { data } =
await supabase
.from("posts")
.select("*")
.eq("category",category)
.neq("id",currentId)
.limit(6);

if(!data) return;

related.innerHTML="";

data.forEach(post=>{

related.innerHTML += `

<div class="news-card">

<img src="${post.image}">

<div class="card-content">

<span class="news-category">

${post.category}

</span>

<h3>

${post.title}

</h3>

<a
href="post.html?id=${post.id}"
class="read-more">

Read More

</a>

</div>

</div>

`;

});

}

/* =========================
   SHARE BUTTON
========================= */

document.addEventListener(
"click",
e=>{

if(
e.target.id==="shareBtn"
){

if(
navigator.share
){

navigator.share({

title:
document.title,

url:
window.location.href

});

}else{

navigator.clipboard
.writeText(
window.location.href
);

alert(
"Link Copied"
);

}

}

});

/* =========================
   VIEW COUNTER
========================= */

async function updateViews(id){

const { data } =
await supabase
.from("posts")
.select("views")
.eq("id",id)
.single();

if(!data) return;

await supabase
.from("posts")
.update({

views:
(data.views||0)+1

})
.eq("id",id);

}

/* =========================
   REALTIME SINGLE POST
========================= */

supabase

.channel(
"single-post-channel"
)

.on(
"postgres_changes",
{
event:"*",
schema:"public",
table:"posts"
},
()=>{
loadSinglePost();
}
)

.subscribe();

console.log(
"SINGLE POST READY"
);
