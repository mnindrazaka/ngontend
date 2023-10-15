const linkHome = document.getElementById("link-home");
const linkAbout = document.getElementById("link-about");
const title = document.getElementById("title");

linkAbout.onclick = function (event) {
  event.preventDefault();
  title.textContent = "About Page";
  window.history.pushState(null, "", event.target.href);
};

linkHome.onclick = function (event) {
  event.preventDefault();
  title.textContent = "Home Page";
  window.history.pushState(null, "", event.target.href);
};

if (window.location.hash === "#home") {
  title.textContent = "Home Page";
} else if (window.location.hash === "#about") {
  title.textContent = "About Page";
} else {
  title.textContent = "Home Page ku";
}
