import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://shopping-list-7d768-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInListDB = ref(database, "items")


const itemInput = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");

const appendListToPage = (newItem) => {
  const list = document.getElementById("list")

  
  list.innerHTML += `<li>${newItem}</li>`
}

const clearField = () => {
  itemInput.value = ""
}

const addToCart = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;
  push(itemsInListDB, newItem)
  
  clearField()
  appendListToPage(newItem)
};

addBtn.addEventListener("click", addToCart);
