let table = document.getElementById("productsTable");
let searchInput = document.getElementById("searchInput");
let productList = [];
let currentEditId = null;

let title = document.getElementById("title");
let description = document.getElementById("description");
let category = document.getElementById("category");
let price = document.getElementById("price");
let discount = document.getElementById("discountPercentage");
let stock = document.getElementById("stock");
let imagesInput = document.getElementById("images");

let modal = new bootstrap.Modal(document.getElementById("productModal"));

function calcNewPrice(price, discount = 0) {
    return (price * (1 - discount / 100)).toFixed(2);
}

//fetch Products
function fetchProducts() {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/products");
    request.send();

    request.addEventListener("readystatechange", function () {
        if (request.readyState === 4 && request.status === 200) {
            productList = JSON.parse(request.response);
            displayProducts(productList);
        }
    });
}

//fetchCategories
function fetchCategories() {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/categories");
    request.send();
    request.addEventListener("readystatechange", function () {
        if (request.readyState === 4 && request.status === 200) {
            let categories = JSON.parse(request.responseText);
            category.innerHTML = "";
            categories.forEach(cat => {
                let option = document.createElement("option");
                option.value = cat.name;
                option.textContent = cat.name;
                category.appendChild(option);
            });
        }
    });
}

//display Products
function displayProducts(list) {
    let container = "";
    for (let p of list) {
        container += `
        <tr>
            <td>${p.id}</td>
            <td><img src="${p.thumbnail}" width="60"></td>
            <td>${p.title}</td>
            <td>${p.category}</td>
            <td>${p.rating ?? 0}</td>
            <td>$${p.price}</td>
            <td>${p.discountPercentage ?? 0}%</td>
            <td>$${calcNewPrice(p.price, p.discountPercentage ?? 0)}</td>
            <td>${p.stock}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editProduct(${p.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
        </tr>`;
    }

    table.innerHTML = container;
}

//Search
searchInput.addEventListener("input", function () {
    let value = searchInput.value.toLowerCase();
    let filtered = productList.filter(p =>
        p.title.toLowerCase().includes(value) ||
        p.category.toLowerCase().includes(value)
    );
    displayProducts(filtered);
});

//delete 
function deleteProduct(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete"
    }).then(result => {
        if (result.isConfirmed) {
            let request = new XMLHttpRequest();
            request.open("DELETE", `http://localhost:3000/products/${id}`);
            request.send();

            request.onload = fetchProducts;
        }
    });
}

//resetForm
function resetForm() {
    title.value = "";
    description.value = "";
    category.value = "";
    price.value = "";
    discount.value = "";
    stock.value = "";
    imagesInput.value = "";
}

//open modal
document.getElementById("open-form-btn").addEventListener("click", () => {
    currentEditId = null;
    document.querySelector(".modal-title").innerText = "Add Product";
    document.getElementById("saveBtn").innerText = "Save Product";
    resetForm();
    modal.show();
});

// edit
function editProduct(id) {
    currentEditId = id;
    let product = productList.find(p => p.id === id);
    document.querySelector(".modal-title").innerText = "Edit Product";
    document.getElementById("saveBtn").innerText = "Update Product";
    title.value = product.title;
    description.value = product.description;
    category.value = product.category;
    price.value = product.price;
    discount.value = product.discountPercentage;
    stock.value = product.stock;
    imagesInput.value = product.images.join(",");
    modal.show();
}


//save/update 
document.getElementById("saveBtn").addEventListener("click", function (e) {
    e.preventDefault();
    let titleValue = title.value.trim();
    let descriptionValue = description.value.trim();
    let categoryValue = category.value;
    let priceValue = price.value.trim();
    let discountValue = discount.value.trim();
    let stockValue = stock.value.trim();
    let imagesValue = imagesInput.value.trim();
    if (!titleValue || !descriptionValue || !categoryValue ||
        !priceValue || !discountValue || !stockValue || !imagesValue) {
        Swal.fire({
            icon: "error",
            text: "Please fill all fields!"
        });
        return;
    }

    let images = imagesValue.split(",").map(i => i.trim());
    let product = {
        title: titleValue,
        description: descriptionValue,
        category: categoryValue,
        price: +priceValue,
        discountPercentage: +discountValue,
        stock: +stockValue,
        images,
        thumbnail: images[0]
    };

    let request = new XMLHttpRequest();

    if (currentEditId) {
        request.open("PUT", `http://localhost:3000/products/${currentEditId}`);
    } else {
        request.open("POST", "http://localhost:3000/products");
    }

    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        modal.hide();
        fetchProducts();
        currentEditId = null;
        resetForm();
    };

    request.send(JSON.stringify(product));
});

fetchProducts();
fetchCategories();
