"use strict"

const inputProductName = document.getElementById("inputProductName");
const inputProductPrice = document.getElementById("inputProductPrice");
const InputProductDescirption = document.getElementById("InputProductDescirption");
const InputProductImage = document.getElementById("InputProductImage");
    
let oldProductList;
let updatedProductIndex;


let productsList = JSON.parse(localStorage.getItem("MahmoudShopProductList")) || [];
if (productsList){
    displayProducts(productsList);
}
function addProduct(){
    const product = {
        productName:inputProductName.value,
        price:inputProductPrice.value,
        descirption:InputProductDescirption.value,
        image:InputProductImage.files[0].name
    }
    productsList.push(product);
    displayProducts(productsList)
    clearForm();
    
    localStorage.setItem("MahmoudShopProductList",JSON.stringify(productsList));
}

function displayProducts(arr){
    let container = ``;
    for(let i = 0; i < arr.length; i++){
        container +=
                `
                    <div  class="item col-md-3">
                        <div class="inner">
                            <img class="w-100 pb-3" src="./imgs/${arr[i].image}" alt="iphone 12 pro max">
                            <p class="mb-2">${arr[i].productName}</p>
                            <p class="mb-2"> <span>Prodact Price:</span> <span class="text-primary">${arr[i].price}</span> <span class="text-primary">L.E</span></p>
                            <p>Prodact Descirption: ${arr[i].descirption}</p>
                            <button onclick="deleteProduct(${i})" class="btn btn-sm btn-outline-danger w-100 mb-2">Delete <i class="fas fa-trash-alt"></i></button>
                            <button onclick="editProduct(${i})" class="btn btn-sm btn-outline-info w-100 mb-2">Edit <i class="fas fa-pen"></i></button>
                        </div>
                    </div>
                `;

    }
    document.getElementById("productsCols").innerHTML = container;

}

function clearForm(){
    inputProductName.value = null;
    inputProductPrice.value = null;
    InputProductDescirption.value = null;
    InputProductImage.value = null;
}
function searchProdut(searchInput){
    let container = [];


    for(i = 0; i < productsList.length; i++){
        if(productsList[i].productName.toLocaleLowerCase().toUpperCase().includes(searchInput.value.toLocaleLowerCase().toUpperCase())){
            container.push(productsList[i])
        }
    }
    displayProducts(container);
    // console.log(oldProductList); 
}

function deleteProduct(index){
    productsList.splice(index, 1);
    localStorage.setItem("MahmoudShopProductList",JSON.stringify(productsList));
    displayProducts(productsList);
}


function editProduct(index){
    oldProductList = productsList;
    updatedProductIndex = index;
    inputProductName.value = productsList[index].productName;
    inputProductPrice.value = productsList[index].price;
    InputProductDescirption.value = productsList[index].descirption;

    document.getElementById("updateBtn").classList.replace("d-none","d-inline-block");
    document.getElementById("addBtn").classList.replace("d-inline-block","d-none");

}

function updateProduct(){
    oldProductList[updatedProductIndex].productName = inputProductName.value;
    oldProductList[updatedProductIndex].price = inputProductPrice.value;
    oldProductList[updatedProductIndex].descirption = InputProductDescirption.value;

    localStorage.setItem("MahmoudShopProductList",JSON.stringify(oldProductList));
    displayProducts(productsList);
    clearForm()
    document.getElementById("updateBtn").classList.replace("d-inline-block","d-none");
    document.getElementById("addBtn").classList.replace("d-none","d-inline-block");

    // oldProductList = undefined;
} 

