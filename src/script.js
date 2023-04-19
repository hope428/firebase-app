import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://shopping-list-7d768-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInListDB = ref(database, "items")
const booksInDB = ref(database, "books")


const itemInput = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");

const appendListToPage = (newItem) => {
  const list = document.getElementById("list")

  list.innerHTML += `<li>${newItem}</li>`
}

const clearField = () => {
  itemInput.value = ""
}

const getItemsInDB = () => {
  onValue(itemsInListDB, function(snapshot){
    let items = Object.values(snapshot.val())
    clearList()
    items.forEach((item) => {appendListToPage(item)})
  })
}

const clearList = () => {
  list.innerHTML = ""
}

const addToCart = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;
  push(itemsInListDB, newItem)

  clearField()
};

getItemsInDB()

addBtn.addEventListener("click", addToCart);

