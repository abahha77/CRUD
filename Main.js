let products = [];

let productname = document.getElementById("productname");
let productprice = document.getElementById("productprice");
let productcategory = document.getElementById("productcategory");
let productdescription = document.getElementById("productdescription");
let search = document.getElementById("search");

getdata();

function getdata() {
  fetch("http://localhost:8000/get")
    .then((response) => response.json())
    .then((json) => {
      console.log({ messsage: "succses", user: json });
      products = json;
      showdata();
      console.log(products);
    });
}

function showdata() {
  str = "";
  for (let index = 0; index < products.length; index++) {
    str += `
        <tr>
        <td>${products[index].id}</td>
        <td>${products[index].name}</td>
        <td>${products[index].price}</td>
        <td>${products[index].category}</td>
        <td>${products[index].description}</td>
       <td> <button class="btn btn-outline-info" onclick="updated(${index})">Update</button> </td>
       <td> <button class="btn btn-outline-danger" onclick="deleted(${products[index].id})" >Delete</button> </td>
      </tr>
        `;
  }
  document.getElementById("tbt").innerHTML = str;
}

function added() {
  let data = {
    name: productname.value,
    price: productprice.value,
    category: productcategory.value,
    description: productdescription.value,
  };

  senddata("Add", "post", data);

  getdata();
  getdata();
}

function deleted(id) {
  senddata("delete", "delete", { id });
}

function senddata(endpoint, method, data) {
  // main.js

  // POST request using fetch()
  fetch(`http://localhost:8000/${endpoint}`, {
    // Adding method type
    method: method,

    // Adding body or contents to send
    body: JSON.stringify(data),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((json) => {
      if (json.messsage == "success") {
        getdata();
      }
    });
}

function updated(index) {
  document.getElementById("updates").style.display = "block";
  document.getElementById("add").style.display = "none";

  productname.value = products[index].name;
  productprice.value = products[index].price;
  productcategory.value = products[index].category;
  productdescription.value = products[index].description;
}
