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


/* ===== SUPABASE ===== */

const supabaseUrl = "https://ltknnbjsymyrpnuntwyo.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_r2vMX1He-CTQk8yxKcGcOw__aaTWrLd";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

async function loadArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  console.log("Articles:", data);
}

loadArticles();
