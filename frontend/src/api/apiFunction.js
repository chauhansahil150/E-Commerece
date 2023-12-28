import { BACKEND_URL } from "../config.jsX";
import { ADD_PRODUCT, ALLPRODUCTS_TO_BE_APPROVED_BY_ADMIN } from "./api";
export async function getAllProducts(start, itemsPerPage) {
  // const response = await fetch("https://dummyjson.com/products");
  const response = await fetch(
    `${BACKEND_URL}/product/products?start=${start}&no_of_products=${itemsPerPage}`,
    {
      method: "get",
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}
export async function countAllProducts() {
  return new Promise((resolve, reject) => {
    fetch(`${BACKEND_URL}/product/products/count`, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.status == 200) {
          // console.log('hello....',res);
          return res.json();
        }
      })
      .then((data) => {
        resolve(data.count);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function handleUpdate(product) {
  try {
    const id = product?.id;
    const name = product?.name;
    const price = product?.price;
    const quantity = product?.quantity;
    const description = product?.description;

    const response = await updateProduct(id, {
      name,
      price,
      quantity,
      description,
    });

    // Handle the response (e.g., show a success message)
    let data;
    if(response.ok){
       data = await response.json();
    alert('Product updated successfully');
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
export async function handleDelete(id, isDeleteClicked) {
  try {
    const response = await deleteProduct(id);
    const data = await response.json();
    if (data) {
      isDeleteClicked(true);
    }
  } catch (error) {
    console.log(error);
  }
}
async function updateProduct(id, data) {
  const url = `${BACKEND_URL}/product/${id}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options);
}
export function addProductBySeller(formdata) {
  return new Promise((resolve, reject) => {
    fetch(ADD_PRODUCT, {
      method: "POST",
      body: formdata,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res.message);
      })
      .catch((err) => {
        reject("!something went wrong");
      });
  });
}

async function deleteProduct(id) {
  const url = `${BACKEND_URL}/product/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, options);
}
