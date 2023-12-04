let state = {
  inputProductName: "",
  inputProductPrice: 0,
  products: [
    { name: "Nasi Goreng", price: 10000 },
    { name: "Ayam Goreng", price: 13000 },
    { name: "Nasi Goreng Sambal Matah", price: 15000 },
  ],
  editIndex: null,
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
    const newProducts =
      state.editIndex === null
        ? [
            ...state.products,
            { name: state.inputProductName, price: state.inputProductPrice },
          ]
        : state.products.map((product, index) =>
            state.editIndex === index
              ? { name: state.inputProductName, price: state.inputProductPrice }
              : product
          );

    setState({
      products: newProducts,
      inputProductName: "",
      inputProductPrice: 0,
      editIndex: null,
    });
  };

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Batal";
  cancelButton.onclick = function () {
    setState({
      inputProductName: "",
      inputProductPrice: 0,
      editIndex: null,
    });
  };

  const productList = document.createElement("ol");

  for (let i = 0; i < state.products.length; i++) {
    const product = state.products[i];

    const productListItem = document.createElement("li");

    const listItemText = document.createElement("span");
    listItemText.textContent = `${product.name} : Rp. ${product.price}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      setState({
        products: state.products.filter((_, index) => i !== index),
      });
    };

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      setState({
        inputProductName: product.name,
        inputProductPrice: product.price,
        editIndex: i,
      });
    };

    console.log(state);

    productListItem.append(listItemText);
    productListItem.append(editButton);
    productListItem.append(deleteButton);

    productList.appendChild(productListItem);
  }

  const total = state.products.reduce((prev, curr) => prev + curr.price, 0);

  const totalText = document.createElement("p");
  totalText.textContent = `Rp. ${total}`;

  const emptyText = document.createElement("p");
  emptyText.textContent = "Daftar Belanjaan Kosong, Silahkan Ditambah Dulu";

  const container = document.createElement("div");
  container.appendChild(navbar);
  container.appendChild(title);
  container.appendChild(productNameInput);
  container.appendChild(productPriceInput);
  container.appendChild(submitButton);

  if (state.editIndex !== null) {
    container.appendChild(cancelButton);
  }

  container.appendChild(state.products.length > 0 ? productList : emptyText);
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
