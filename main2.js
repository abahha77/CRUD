let productname=document.getElementById('productname');
let productprice=document.getElementById('productprice');
let productcategory=document.getElementById('productcategory');
let productdescription=document.getElementById('productdescription');

let products=[];

function getdata()
{
    
        fetch('http://localhost:8000/get')
        .then(response => response.json())
        .then(json =>{
          console.log( {messsage:'succses',user:json});
                products=json
                showdata();
                console.log(products)
        })
      
      
}

function showdata()
{
    str="";
    for(let x=0;x<products.length(),x++)
    {
        str+=`<td>${products[x].productname}</td>
        
        <td>${
            products[x].productprice
        }</td>

        <td>${products[x].productcategory}</td>
        <td>${products[x].productdescription}</td>
        
        `
    }
}
