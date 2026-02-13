let categoriesList=[ 
    {
        name:"beauty",
        image:"resources/beauty.jpg"
    }, 
    {
        name:"fragrances",
        image:"resources/fragrances.jpg"
    },
    {
        name:"furniture",
        image:"resources/furniture.jpg"
    },
    {
        name:"groceries",
        image:"resources/groceries.jpg"
    },
    {
        name:"kitchen-accessories",
        image:"resources/kitchen-accessories.jpg"
    },
    {
        name:"laptops",
        image:"resources/laptops.jpg"
    },
    {
        name:"mens-shirts",
        image:"resources/mens-shirts.jpg"
    },
    {
        name:"mens-shoes",
        image:"resources/mens-shoes.jpg"
    },
    {
        name:"mens-watches",
        image:"resources/mens-watches.jpg"
    },
    {
        name:"mobile-accessories",
        image:"resources/mobile-accessories.jpg" 
    },
    {
        name:"motorcycle",
        image:"resources/motorcycle.jpg"
    },
    {
        name:"skin-care",
        image:"resources/skin-care.jpg"
    },
    {
        name:"smartphones",
        image:"resources/smartphones.jpg"
    },
    {
        name:"sports-accessories",
        image:"resources/sports-accessories.jpg"
    },{
        name:"sunglasses",
        image:"resources/sunglasses.jpg"
    },
    {
        name:"tablets",
        image:"resources/tablets.jpg"
    },
    {
        name:"tops",
        image:"resources/tops.jpg"
    },
    {
        name:"vehicle",
        image:"resources/vehicle.jpg"
    },
    {
        name:"womens-bags",
        image:"resources/womens-bags.jpg"
    },
    {
        name:"womens-dresses",
        image:"resources/womens-dresses.jpg"
    },
    {
        name:"womens-jewellery",
        image:"resources/womens-jewellery.jpg"
    },
    {
        name:"womens-shoes",
        image:"resources/womens-shoes.jpg"
    },
    {
        name:"womens-watches",
        image:"resources/womens-watches.jpg"
    }
];
function calcNewPrice(price, discount) {
    return (price * (1 - discount / 100)).toFixed(2);
}
let container=``;
for (let i = 0; i < categoriesList.length; i++) {
    container += `
        <a href="products.html?category=${categoriesList[i].name}" class="text-decoration-none text-dark d-block" >
            <div class="category-card text-center p-2 border rounded" style="min-width:120px; cursor:pointer;" >
                <img src="${categoriesList[i].image}" class="mb-2" width="100px" height="100px" alt="${categoriesList[i].name}">
                <p>${categoriesList[i].name}</p>
            </div>
        </a>
    `;
}

document.getElementById("Categories").innerHTML=container;


function fetchProducts(callback) {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/products");
    request.send();
    request.addEventListener("readystatechange", function () {
    if (request.readyState === 4) {
        if (request.status === 200) {
            let products = JSON.parse(request.response);
            callback(products);
        } else {
            console.error("Error fetching products:", request.status);
        }
    }
});
}

function getTopProducts(products) {
    let sorted = [...products].sort((a, b) => b.rating - a.rating);
    return sorted.slice(0, 4);
}

function getRandomProducts(products) {
    let shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
}

function displayData(myData, sectionId){
    let container = ``;

    for(let i = 0; i < myData.length; i++){
        let discountBadge = myData[i].discountPercentage > 0
            ? `<span class="text-danger rounded-end bg-danger-subtle p-2">
                    ${myData[i].discountPercentage.toFixed(0)}% off
                </span>`
            : "";
        container += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card product-card h-100 border-0 shadow-sm">

                    <a href="/html/productDetails.html?id=${myData[i].id}" class="text-decoration-none text-dark">
                        <div class="img-container">
                            ${discountBadge}
                            <img src="${myData[i].thumbnail}" class="card-img-top ll">
                        </div>
                    </a>

                    <div class="card-body">
                        <div class="d-flex justify-content-between gap-1">
                            <p class="text-muted mb-1">${myData[i].category}</p>
                            <p><i class="fa-solid fa-star text-warning" style="margin-right: 5px;"></i>${myData[i].rating}</p>
                        </div>

                        <a href="productDetails.html?id=${myData[i].id}" class="text-decoration-none text-dark">
                            <h6 class="fw-bold">${myData[i].title}</h6>
                        </a>

                        <p class="text-success fw-medium">
                            <span class="fs-5">$${calcNewPrice(myData[i].price, myData[i].discountPercentage)}</span>
                            <span class="text-decoration-line-through text-secondary">$${myData[i].price}</span>
                        </p>

                        <button class="btn btn-dark w-100 mt-3 add-to-cart" data-id="${myData[i].id}">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>`;
    }

    document.getElementById(sectionId).innerHTML = container;
}


fetchProducts(products => {
    let top4 = getTopProducts(products);
    displayData(top4, "top-products-section");

    let random4 = getRandomProducts(products);
    displayData(random4, "random-products-section");
});
