let state = {
  searchValue: "",
};

function setState(newState) {
  const nextState = { ...state, ...newState };
  state = nextState;
  render();
}

function Link(props) {
  const link = document.createElement("a");
  link.href = props.href;
  link.textContent = props.textContent;
  link.onclick = function (event) {
    event.preventDefault();
    window.history.pushState(null, "", event.target.href);
    render();
  };

  return link;
}

function Navbar() {
  const linkHome = Link({ href: "#home", textContent: "Home" });
  const linkAbout = Link({ href: "#about", textContent: "About" });

  const container = document.createElement("div");
  container.appendChild(linkHome);
  container.appendChild(linkAbout);
  return container;
}

function HomePage() {
  const navbar = Navbar();

  const title = document.createElement("h1");
  title.textContent = "Home";

  const textPreview = document.createElement("p");
  textPreview.textContent = state.searchValue;

  const searchInput = document.createElement("input");
  searchInput.placeholder = "input your product name";
  searchInput.value = state.searchValue;
  searchInput.oninput = function (event) {
    setState({ searchValue: event.target.value });
  };

  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear";
  clearButton.onclick = function () {
    setState({ searchValue: "" });
  };

  const container = document.createElement("div");
  container.appendChild(navbar);
  container.appendChild(title);
  container.appendChild(searchInput);
  container.appendChild(clearButton);
  container.appendChild(textPreview);

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
