function Navbar() {
  const linkHome = document.createElement("a");
  linkHome.href = "#home";
  linkHome.textContent = "Home";
  linkHome.onclick = function (event) {
    event.preventDefault();
    window.history.pushState(null, "", event.target.href);
    render();
  };

  const linkAbout = document.createElement("a");
  linkAbout.href = "#about";
  linkAbout.textContent = "About";
  linkAbout.onclick = function (event) {
    event.preventDefault();
    window.history.pushState(null, "", event.target.href);
    render();
  };

  const container = document.createElement("div");
  container.appendChild(linkHome);
  container.appendChild(linkAbout);
  return container;
}

function HomePage() {
  const navbar = Navbar();

  const title = document.createElement("h1");
  title.textContent = "Home";

  const searchInput = document.createElement("input");
  searchInput.placeholder = "input your product name";

  const container = document.createElement("div");
  container.appendChild(navbar);
  container.appendChild(title);
  container.appendChild(searchInput);

  return container;
}

function AboutPage() {
  const navbar = Navbar();

  const title = document.createElement("h1");
  title.textContent = "About";

  const container = document.createElement("div");
  container.appendChild(navbar);
  container.appendChild(title);

  return container;
}

function App() {
  const homePage = HomePage();
  const aboutPage = AboutPage();

  if (window.location.hash === "#home") {
    return homePage;
  } else if (window.location.hash === "#about") {
    return aboutPage;
  } else {
    return homePage;
  }
}

function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(App());
}

render();
