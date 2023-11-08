let state = {
  inputProductName: "",
  inputProductPrice: 0,
  products: [{ name: "Nasi Goreng", price: 10000 }],
  total: 10000,
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
  title.textContent = "Daftar Belanja";

  const productNameInput = document.createElement("input");
  productNameInput.id = "productNameInput";
  productNameInput.placeholder = "nama barang";
  productNameInput.value = state.inputProductName;
  productNameInput.oninput = function (event) {
    setState({ inputProductName: event.target.value });
  };

  const productPriceInput = document.createElement("input");
  productPriceInput.id = "productPriceInput";
  productPriceInput.type = "number";
  productPriceInput.placeholder = "harga barang";
  productPriceInput.value = state.inputProductPrice;
  productPriceInput.oninput = function (event) {
    setState({ inputProductPrice: parseInt(event.target.value) });
  };

  const submitButton = document.createElement("button");
  submitButton.textContent = "Simpan";
  submitButton.onclick = function () {
    setState({
      products: [
        ...state.products,
        { name: state.inputProductName, price: state.inputProductPrice },
      ],
      inputProductName: "",
      inputProductPrice: 0,
      total: state.total + state.inputProductPrice,
    });
  };

  const productList = document.createElement("ol");

  for (let i = 0; i < state.products.length; i++) {
    const product = state.products[i];

    const productListItem = document.createElement("li");
    productListItem.textContent = `${product.name} : Rp. ${product.price}`;
    productList.appendChild(productListItem);
  }

  const totalText = document.createElement("p");
  totalText.textContent = `Rp. ${state.total}`;

  const container = document.createElement("div");
  container.appendChild(navbar);
  container.appendChild(title);
  container.appendChild(productNameInput);
  container.appendChild(productPriceInput);
  container.appendChild(submitButton);
  container.appendChild(productList);
  container.appendChild(totalText);

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
  console.log(state);

  const root = document.getElementById("root");

  const focusedElement = document.activeElement;
  const focusedElementId = focusedElement.id;
  const selectionStart = focusedElement.selectionStart;
  const selectionEnd = focusedElement.selectionEnd;

  root.innerHTML = "";
  root.appendChild(App());

  if (focusedElementId) {
    const focusedElement = document.getElementById(focusedElementId);
    focusedElement.focus();
    focusedElement.selectionStart = selectionStart;
    focusedElement.selectionEnd = selectionEnd;
  }
}

render();
