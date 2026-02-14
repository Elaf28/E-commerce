// const tbody = document.querySelector("#ordersTable tbody");

// function loadOrders(){
//   fetch("http://localhost:3000/orders")
//   .then(res => res.json())
//   .then(data => {
//     tbody.innerHTML = "";

//     data.forEach((o, i) => {
//       tbody.innerHTML += `
//         <tr>
//           <td>${o.id}</td>
//           <td>${o.customer || "Unknown"}</td>
//           <td>$${o.total || 0}</td>
//           <td>
//             <span class="badge 
//               ${o.status === "Pending" ? "bg-warning" :
//                 o.status === "Confirmed" ? "bg-success" :
//                 "bg-danger"}">
//               ${o.status}
//             </span>
//           </td>
//           <td>${o.date || "-"}</td>
//           <td>
//             ${
//               o.status === "Pending"
//               ? `
//                 <button class="btn btn-sm btn-success me-1" onclick="updateStatus(${o.id}, 'Confirmed')">Confirm</button>
//                 <button class="btn btn-sm btn-danger" onclick="updateStatus(${o.id}, 'Rejected')">Reject</button>
//               `
//               : `<span class="text-muted">No Actions</span>`
//             }
//           </td>
//         </tr>
//       `;
//     });
//   });
// }

// function updateStatus(id, newStatus){
//   fetch(`http://localhost:3000/orders/${id}`, {
//     method: "PATCH",
//     headers: {"Content-Type":"application/json"},
//     body: JSON.stringify({ status: newStatus })
//   }).then(() => loadOrders());
// }

// loadOrders();


function getCount(url, elementId) {
  let request = new XMLHttpRequest();

  request.open("GET", "http://localhost:3000" + url);
  request.send();

  request.addEventListener("readystatechange", function () {
    if (request.readyState === 4 && request.status === 200) {
      let data = JSON.parse(request.responseText);
      document.getElementById(elementId).innerText = data.length;
    }
  });
}

function loadCounts() {
  getCount("/products", "productsCount");
  getCount("/orders", "ordersCount");
  getCount("/users", "usersCount");
  getCount("/categories", "categoriesCount");
}

loadCounts();