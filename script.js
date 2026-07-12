function openMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (sidebar) sidebar.classList.add("active");
  if (overlay) overlay.classList.add("active");
}

function closeMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (sidebar) sidebar.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
}

function openSearch() {
  const searchBox = document.getElementById("searchBox");

  if (searchBox) {
    searchBox.classList.toggle("active");
  }
}

const overlay = document.getElementById("overlay");
if (overlay) {
  overlay.onclick = closeMenu;
}
if (overlay)
  overlay.onclick = closeMenu;

// Supabase

const supabaseUrl = "https://ltknnbjsymyrpnuntwyo.supabase.co/rest/v1/";

const supabaseKey = "sb_publishable_r2vMX1He-CTQk8yxKcGcOw__aaTWrLd";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

console.log("Supabase Connected");
