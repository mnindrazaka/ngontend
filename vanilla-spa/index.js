const root = document.getElementById("root");

const title = document.createElement("h1");
title.textContent = "Home";

const linkHome = document.createElement("a");
linkHome.href = "#home";
linkHome.textContent = "Home";

const searchInput = document.createElement("input");
searchInput.placeholder = "input your product name";

linkHome.onclick = function (event) {
  root.innerHTML = "";

  event.preventDefault();

  root.appendChild(linkHome);
  root.appendChild(linkAbout);
  root.appendChild(title);
  title.textContent = "Home";

  root.appendChild(searchInput);

  window.history.pushState(null, "", event.target.href);
};

const linkAbout = document.createElement("a");
linkAbout.href = "#about";
linkAbout.textContent = "About";

linkAbout.onclick = function (event) {
  root.innerHTML = "";

  event.preventDefault();

  root.appendChild(linkHome);
  root.appendChild(linkAbout);
  root.appendChild(title);
  title.textContent = "About";
  window.history.pushState(null, "", event.target.href);
};

root.appendChild(linkHome);
root.appendChild(linkAbout);
root.appendChild(title);

if (window.location.hash === "#home") {
  title.textContent = "Home";
  root.appendChild(searchInput);
} else if (window.location.hash === "#about") {
  title.textContent = "About";
} else {
  title.textContent = "Home";
  root.appendChild(searchInput);
}
